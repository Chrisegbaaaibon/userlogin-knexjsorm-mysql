// Update with your config settings.
const path = require('path')
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      filename: 'src/core/db',
      database: 'lender',
      user:     'GhostX',
      password: 'password'
    }
  },

  staging: {
    client: 'mysql2',
    connection: {
      database: 'lendsqr',
      user:     'GhostX',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '/data/migrations')
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
