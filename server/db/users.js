const { client } = require('./client');
const bcrypt = require('bcrypt')
const saltRounds = 10

const createUser = async ({ email, password }) => {
  console.log(email, password)
  try {
    const hashedPass = await bcrypt.hash(password, saltRounds)
    const { rows: [user] } = await client.query(`
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING *
  `, [email, hashedPass])
    delete user.password
    return user
  } catch (error) {
    console.error(error)
  }
}

const getUserByEmail = async ({ email, password }) => {
  try {
    const { rows: [user] } = await client.query(`
    SELECT * FROM users
    WHERE email = $1
    `, [email])
    return user
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  createUser,
  getUserByEmail
}