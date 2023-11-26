const { getGamesByUserId, getGameById, createGame, completeGame, reactivateGame, updateScore } = require('../db');

const router = require('express').Router();


// Get all games by userId
router.get('/:userId', async (req, res, next) => {
  try {
    console.log(req.params)
    const games = await getGamesByUserId(req.params.userId)
    if (games){
    if (req.user?.id === req.params.userId){
        res.send(games)
      } else {
        next({
          name: "UnauthorizedUserError",
          message: "Cannot view another user's games"
        })
      }
    } else {
      next({
        name: "NoGamesError",
        message: "There are no games to display"
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
    if (game){
      if (req.user?.id === game.player_id){
        res.send(game)
      } else {
        next({
          name: "UnauthorizedUserError",
          message: "Cannot view another user's games"
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

// Create new game
router.post('/', async (req, res, next) => {
  try {
    if (req.user){
      const {name, gamePlayers} = req.body
      const playerId = req.user.id
      const newGame = await createGame({name, playerId, gamePlayers})
      const game = await getGameById(newGame.id)
      res.send(game)
    }
  } catch (error) {
    next(error) 
  }
})

// Toggle game isComplete
router.patch('/:gameId', async (req, res, next)=>{
  try {
    const game = await getGameById(req.params.gameId)
    if (game.player_id === req.user?.id){
    if (game) {
        if (game.completed){
          const patchedGame = await reactivateGame(game.id)
          res.send(patchedGame)
        } else {
          const patchedGame = await completeGame(game.id)
          res.send(patchedGame)
        }
      } else {
        next({
          name: "GameNotFoundError",
          message: "That game does not exist"
        })
      }
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "Cannot edit another user's games"
      })
    }
  } catch (error) {
    next(error)
  }
})



module.exports = router;