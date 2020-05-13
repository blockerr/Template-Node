const {DataTypes, Model} = require('sequelize');
const db = require('../services/database');

class Admin extends Model {}
Admin.init({
  admin_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  sex: DataTypes.STRING,
  phone: DataTypes.STRING,
  password: DataTypes.STRING, 
  role: DataTypes.STRING,   
  birthday: DataTypes.DATE,  
  address: DataTypes.STRING,  
  avatar: DataTypes.STRING,
  create_at: DataTypes.DATE,
  update_at: DataTypes.DATE,
}, { sequelize: db, modelName: 'admin' });

module.exports = Admin;
