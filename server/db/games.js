const { client } = require('./client');

const createGame = async ({name, playerId, gamePlayers}) => {
  try {
    const {rows: [game]} = await client.query(`
    INSERT INTO games (name, player_id)
    VALUES ($1, $2)
    RETURNING *
    `, [name, playerId])
    const players = Promise.all(gamePlayers.map(async(player) =>{
      await createGamePlayer(player)
    }) 
    )
  } catch (error) {
    console.error(error)
  }
}

const createGamePlayer = async (gameId, player) => {
  const {playerId, isGuest} = player
  try {
    const {rows: [player]} = await client.query(`
    INSERT INTO game_players (game_id, player_id, is_guest)
    `)
  } catch (error) {
    console.error(error)
  }

}

module.exports = {
  createGame
}