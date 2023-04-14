const { updateScore, getGameById } = require('../db');

const router = require('express').Router();

// Update score
router.patch('/:gameId', async (req, res, next)=>{
  try {
    const game = await getGameById(req.params.gameId)
    if (game){
      const updatedScore = await updateScore(game.id, req.body.playerId, req.body.score)
      if (updatedScore){
        res.send(updatedScore)
      } else {
        next({
          name: "PlayerNotFoundError",
          message: "That player does not exist"
        })
      }
    } else {
      next({
        name: "GameNotFoundError",
        message: "That game does not exist"
      })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router;