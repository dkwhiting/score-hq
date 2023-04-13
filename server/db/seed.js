const { client } = require('./client');
const {
  createUser
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
      player_id VARCHAR(55) REFERENCES users(id) 
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
    password: 'password'
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
    console.log('this is users', newList)
    console.log('Finished creating initial users')
  } catch (error) {
    console.error('Error creating initial users', error)
  }
}

const createInitialGame = async () => {
  try {
    console.log('Creating initial game')

    console.log('Finished creating initial game')
  } catch (error) {
    console.error('Error creating initial game', error)
  }
}

(async () => {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers()
  } catch (error) {
    console.error('Error during rebuildDB', error);
    throw error;
  } finally {
    console.log("Database has been rebuilt");
    await client.end()
    console.log('Pool ended')
  }
})();