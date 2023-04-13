const { client } = require('./client');
const { createGame, getGameById } = require('./games');
const { updateScore } = require('./scores');
const {
  createUser, 
  getUserByEmail,
  getUserById
} = require('./users')

const dropTables = async () => {
  try {
    console.log('Dropping tables')
    await client.query(`
    DROP TABLE IF EXISTS scores;
    DROP TABLE IF EXISTS game_players;
    DROP TABLE IF EXISTS games;
    DROP TABLE IF EXISTS users;
    `)
    console.log('Finished dropping tables')
  } catch (error) {
    console.error('Error dropping tables', error)
  }
}

const createTables = async () => {
  try {
    console.log('Building tables')
    await client.query(`
    CREATE TABLE users (
      id VARCHAR(55) PRIMARY KEY NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE games (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      player_id VARCHAR(55),
      completed BOOLEAN NOT NULL DEFAULT FALSE
    );
    
    CREATE TABLE game_players (
      id SERIAL PRIMARY KEY,
      game_id INTEGER REFERENCES games(id),
      player_id VARCHAR(55) REFERENCES users(id),
      is_guest BOOLEAN NOT NULL DEFAULT FALSE
    );
    
    CREATE TABLE scores (
      id SERIAL PRIMARY KEY,
      game_id INTEGER REFERENCES games(id),
      player_id VARCHAR(55) REFERENCES users(id),
      score INTEGER NOT NULL
    );
    `)

    console.log('Finished building tables')
  } catch (error) {
    console.error('Error building tables', error)
  }
}

const usersList = [
  {
    name: 'Jobin',
    email: 'jobin@fake.com',
    password: 'password'
  },
  {
    name: 'Pistol',
    email: 'pistol_pete@fake.com',
    password: 'password',
  },
  {
    name: 'Lou Ferigno',
    email: 'og.hulk@fake.com',
    password: 'password'
  },

]

const createInitialUsers = async () => {
  try {
    console.log('Creating initial users')
    const newList = []
    while (usersList.length){
      const user = usersList.shift()
      newList.push(await createUser(user))
    }
    return newList
    console.log('Finished creating initial users')
  } catch (error) {
    console.error('Error creating initial users', error)
  }
}

const createInitialGame = async (players) => {
  try {
    console.log('Creating initial game')
    
    const newList = []
    while (players.length){
      const user = players.shift()
      newList.push(await getUserByEmail(user.email))
    }
    const game = {
      name: 'Nertz',
      playerId: newList[0].id,
      gamePlayers: newList
    }
    const newGame = await createGame(game)
    console.log('Finished creating initial game')
  } catch (error) {
    console.error('Error creating initial game', error)
  }
}

(async () => {
  try {
    await dropTables()
    await createTables()
    const players = await createInitialUsers()
    await createInitialGame(players)
  } catch (error) {
    console.error('Error during rebuildDB', error);
    throw error;
  } finally {
    console.log("Database has been rebuilt");
    await client.end()
    console.log('Pool ended')
  }
})();