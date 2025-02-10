const Sequelize = require('sequelize')

const {db} = require('./config')

const sequelize = new Sequelize(db.database, db.user, db.password, { 
    host: db.host,
    dialect: db.dialect, 
    logging: false,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
})

module.exports = sequelize