const { client } = require('./client');
const {generateUID} = require('./utils')
const bcrypt = require('bcrypt')
const saltRounds = 10

const createUser = async ({name, email, password }) => {
  try {
    let hashedPass
    if (password){
      hashedPass = await bcrypt.hash(password, saltRounds)
    }
    const uid = generateUID()
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

const getUserByEmail = async ( email) => {
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
    const {rows: [user]} = await client.query(`
      SELECT * FROM users
      WHERE id = $1
    `, [userId])
    return user
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById
}