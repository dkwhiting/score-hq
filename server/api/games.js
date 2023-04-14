const { getGamesByUserId } = require('../db');

const router = require('express').Router();

router.get('/:userId', async (req, res, next) => {
  try {
    console.log(req.params)
    const games = await getGamesByUserId(req.params.userId)
    res.send(games)
  } catch (error) {
    next(error) 
  }
})

module.exports = router;