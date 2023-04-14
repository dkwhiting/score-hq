
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { getUserByEmail, createUser } = require('../db');

// POST /api/users/login
router.post("/login", async (req, res, next) => {
  console.log(req.body)
  const { email, password } = req.body
  try {
    const user = await getUserByEmail(email)
    const match = await bcrypt.compare(password, user.password)
    if (user && match) {
      delete user.password
      const token = jwt.sign(user, process.env.JWT_SECRET)
      res.send({ message: "You're logged in!", token: token })
    } else {
      res.status(401)
      next({
        name: 'UnauthorizedUserError',
        message: 'Incorrect email or password'
      })
    }
  } catch (error) {
    next(error)
  }
});

// POST /api/users/register
router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body
  try {
    const user = await getUserByEmail(email)
    if (user) {
      next({
        name: "UserExistsError",
        message: "A user with that email is already registered"
      })
    } else {
      const user = await createUser({name: name, email: email, password: password })
      const token = jwt.sign(user, process.env.JWT_SECRET)
      res.send({ message: "You're registered!", token: token })
    }
  } catch (error) {
    next(error)
  }
});

module.exports = router;