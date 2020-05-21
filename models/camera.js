const {DataTypes, Model} = require('sequelize');
const db = require('../services/database');
const Lot = require('./lot');

class Camera extends Model {}
Camera.init({
  camera_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  urlCamera: DataTypes.STRING,
  title: DataTypes.STRING,
  create_at: DataTypes.DATE,
  update_at: DataTypes.DATE,
}, { sequelize: db, modelName: 'camera' });



module.exports = Camera;
