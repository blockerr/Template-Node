const {DataTypes, Model} = require('sequelize');
const db = require('../services/database');

class Home_community extends Model {}
Home_community.init({
    community_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: DataTypes.STRING,
  create_at: DataTypes.DATE,
  update_at: DataTypes.DATE,
}, { sequelize: db, modelName: 'community' });

module.exports = Home_community;