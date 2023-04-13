const { client } = require('./client');
const { generateUID } = require('./utils');

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

module.exports = {
  createGame
}