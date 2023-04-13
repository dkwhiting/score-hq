const { client } = require('./client');
const bcrypt = require('bcrypt')
const saltRounds = 10

const createUser = async ({name, email, password }) => {
  try {
    const hashedPass = await bcrypt.hash(password, saltRounds)
    const uid = Date.now().toString(36) + Math.random().toString(16).slice(2)
    console.log(name, email, hashedPass, uid)
    const { rows: [user] } = await client.query(`
    INSERT INTO users (id, name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `, [uid, name, email, hashedPass])
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

const getUserById = async (userId) => {
  try {
    const {rows: [player]} = await client.query(`
    SELECT * FROM users
    WHERE id = $1
    `, [userId])
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById
}