const {DataTypes, Model} = require('sequelize');
const db = require('../services/database');

class Home_introduce extends Model {}
Home_introduce.init({
introduce_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: DataTypes.STRING,
  content1: DataTypes.STRING,
  content2: DataTypes.STRING,
  image: DataTypes.STRING,
  create_at: DataTypes.DATE,
  update_at: DataTypes.DATE,
}, { sequelize: db, modelName: 'introduce' });

module.exports = Home_introduce;
