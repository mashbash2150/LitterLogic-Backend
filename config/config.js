require('dotenv').config()
module.exports = {
  development: {
    database: 'litterlogic_development',
    dialect: 'postgres'
  },
  test: {
    database: 'litterlogic_development',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}







