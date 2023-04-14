const { client } = require('./client')

const initializeScores = async (game) => {
  try {
    const scores = await Promise.all(game.players.map(async(player)=>{
      const {rows: score} = await client.query(`
        INSERT INTO scores (game_id, player_id, score)
        VALUES ($1, $2, $3)
        RETURNING *
      `, [game.id, player.player_id, 0])
      return score
    }))
    return scores
  } catch (error) {
    console.error(error)
  }
}

const updateScore = async (gameId, playerId, newScore) => {
  try {
    const {rows: [score]} = await client.query(`
      UPDATE scores
      SET score = ${newScore}
      WHERE $1 = game_id AND $2 = player_id
      RETURNING *
    `, [gameId, playerId])
    return score
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  initializeScores,
  updateScore
}