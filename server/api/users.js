
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { getUserByEmail, createUser } = require('../db');

// POST /api/users/login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await getUserByEmail(email)
    if (!user) {
      res.status(401)
      next({
        name: 'AccountNotFoundError',
        message: 'Email address not found. Please check the email or create a new account.'
      })
    } else {
      const match = await bcrypt.compare(password, user.password)
      if (user && match) {
        delete user.password
        const token = jwt.sign(user, process.env.JWT_SECRET)
        res.send({ message: "You're logged in!", user: user, token: token })
      } else {
        res.status(401)
        next({
          name: 'InvalidCredentialsError',
          message: 'Incorrect password. Please try again.'
        })
      }

    }
  } catch (error) {
    next(error)
  }
});

// POST /api/users/register
router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body
  console.log(req.body)
  try {
    if (password.length < 6){
      res.status(401)
        next({
          name: 'WeakPasswordError',
          message: 'Password must be at least 6 characters long. Please try again with a stronger password.'
        })
    } else {
      const user = await getUserByEmail(email)
      if (user) {
        next({
          name: "UserExistsError",
          message: "An account with this email already exists. Please use a different email or try to login instead."
        })
      } else {
        const user = await createUser({name: name, email: email, password: password })
        const token = jwt.sign(user, process.env.JWT_SECRET)
        res.send({ message: "You're registered!", user: user, token: token })
      }
    }
  } catch (error) {
    next(error)
  }
});

module.exports = router;