const {DataTypes, Model} = require('sequelize');
const db = require('../services/database');

class Home_services extends Model {}
Home_services.init({
services_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: DataTypes.STRING,
  sup_title1: DataTypes.STRING,
  content1: DataTypes.STRING,
  sup_title2: DataTypes.STRING,
  content2: DataTypes.STRING,
  sup_title3: DataTypes.STRING,
  content3: DataTypes.STRING,
  sup_title4: DataTypes.STRING,
  content4: DataTypes.STRING,
  create_at: DataTypes.DATE,
  update_at: DataTypes.DATE,
}, { sequelize: db, modelName: 'services' });

module.exports = Home_services;
