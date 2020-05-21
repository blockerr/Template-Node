const {DataTypes, Model} = require('sequelize');
const db = require('../services/database');

class Home_advantage extends Model {}
Home_advantage.init({
advantage_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title1: DataTypes.STRING,
  content1: DataTypes.STRING,
  content2: DataTypes.STRING,
  content3: DataTypes.STRING,
  content4: DataTypes.STRING,
  content5: DataTypes.STRING,
  content6: DataTypes.STRING,
  title2: DataTypes.STRING, 
  content7: DataTypes.STRING,
  content8: DataTypes.STRING,
  content9: DataTypes.STRING,
  content10: DataTypes.STRING,
  create_at: DataTypes.DATE,
  update_at: DataTypes.DATE,
}, { sequelize: db, modelName: 'advantage' });

module.exports = Home_advantage;