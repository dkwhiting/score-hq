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
    playerId = generateUID()
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
      SELECT DISTINCT game_players.player_id AS id, scores.score AS score
      FROM game_players
      JOIN scores ON game_players.game_id = game_players.game_id
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
    console.log(games)
    return games
  } catch (error) {
    console.error(error)
  }
}

const completeGame = async (gameId) => {
  try {
    await client.query(`
    UPDATE games
    SET completed = true
    WHERE $1 = game_id AND $2 = player_id
    RETURNING *
  `, [gameId, playerId])
  } catch (error) {
    console.error(error)
  }
}

const reactivateGame = async (gameId) => {
  try {
    await client.query(`
    UPDATE games
    SET completed = false
    WHERE $1 = game_id AND $2 = player_id
    RETURNING *
  `, [gameId, playerId])
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  createGame,
  getGameById,
  getGamesByUserId,
  completeGame
}