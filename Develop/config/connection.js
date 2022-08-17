require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce_db', 'root', 'mysqlishan99', {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;

// process.env.JAWSDB_URL
//   ? new Sequelize(process.env.JAWSDB_URL)
//   : 
