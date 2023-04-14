const { getGamesByUserId, getGameById, createGame } = require('../db');

const router = require('express').Router();


// Get all games
router.get('/:userId', async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId){
      const games = await getGamesByUserId(req.params.userId)
      res.send(games)
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "Cannot view another user's games"
      })
    }
  } catch (error) {
    next(error) 
  }
})

// Get single game 
router.get('/:userId/:gameId', async (req, res, next) => {
  try {
    const game = await getGameById(req.params.gameId)
    res.send(game)
  } catch (error) {
    next(error) 
  }
})

// Create new game
router.post('/', async (req, res, next) => {
  try {
    const {name, playerId, gamePlayers} = req.body
    const newGame = await createGame(req.body)
    const game = await getGameById(newGame.id)
    res.send(game)
  } catch (error) {
    next(error) 
  }
})

module.exports = router;