const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false,
  // timezone: '+07:00',
  define: {
    timestamps: false,
  }
});
