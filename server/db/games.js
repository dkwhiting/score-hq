const { client } = require('./client');
const { initializeScores } = require('./scores');
const {generateUID } = require('./utils');

const createGame = async ({name, playerId, gamePlayers}) => {
  try {
    const {rows: [game]} = await client.query(`
    INSERT INTO games (name, player_id)
    VALUES ($1, $2)
    RETURNING *
    `, [name, playerId])
    const players = await Promise.all(gamePlayers.map(async(player) =>{
      const response = await createGamePlayer(game.id, player)
      delete response.id
      delete response.game_id
      return response
    }) 
    )
    game.players = players
    const scores = await initializeScores(game)
    game.scores = scores
    return game
  } catch (error) {
    console.error(error)
  }
}

const createGamePlayer = async (gameId, player) => {
  debugger
  const {id, isGuest = false} = player
  if (isGuest){
    id = generateUID()
  }
  try {
    const {rows: [player]} = await client.query(`
    INSERT INTO game_players (game_id, player_id, is_guest)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [gameId, id, isGuest])
    return player
  } catch (error) {
    console.error(error)
  }
}

const getGameById = async (gameId) => {
  try {
    const {rows: [game]} = await client.query(`
      SELECT * FROM games
      WHERE id = $1
    `, [gameId])
    const {rows: players} = await client.query(`
      SELECT DISTINCT users.id AS id, users.name AS name, scores.score AS score
      FROM game_players
        JOIN scores ON game_players.game_id = scores.game_id
        JOIN users ON game_players.player_id = users.id
      WHERE game_players.game_id = $1 
    `, [gameId])
    game.players = players
    return game
  } catch (error) {
    console.error(error)
  }
}

const getGamesByUserId = async (userId) => {
  try {
    const {rows: games} = await client.query(`
      SELECT * FROM games
      WHERE player_id = $1
    `, [userId])
    return games
  } catch (error) {
    console.error(error)
  }
}

const completeGame = async (gameId) => {
  try {
    const {rows: [game]} = await client.query(`
    UPDATE games
    SET completed = true
    WHERE id = $1
    RETURNING *
  `, [gameId])
  return game
  } catch (error) {
    console.error(error)
  }
}

const reactivateGame = async (gameId) => {
  try {
    const {rows: [game]} = await client.query(`
    UPDATE games
    SET completed = false
    WHERE id = $1
    RETURNING *
  `, [gameId])
  return game
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  createGame,
  getGameById,
  getGamesByUserId,
  completeGame,
  reactivateGame
}