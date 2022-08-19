
// import sequelize module
const Sequelize = require('sequelize');

// use this to get access to environmental variables
require('dotenv').config();

// set up sequelize connection
const sequelize = process.env.JAWSDB_URL
? new Sequelize(process.env.JAWSDB_URL)
: new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
  }
);

// export sequelize
module.exports = sequelize;




