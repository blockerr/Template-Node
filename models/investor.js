const {DataTypes, Model} = require('sequelize');
const db = require('../services/database');
const Lot = require('./lot');

class Investor extends Model {}
Investor.init({
  investor_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lot_id: DataTypes.INTEGER,
  companyName: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  representative: DataTypes.STRING,
  avatar: DataTypes.STRING,
  address: DataTypes.STRING, 
  avatar: DataTypes.STRING,
  create_at: DataTypes.DATE,
  update_at: DataTypes.DATE,
}, { sequelize: db, modelName: 'investor' });

Lot.hasOne(Investor, {
    foreignKey: {
        name: 'lot_id',
        allowNull: false
    }
})

module.exports = Investor;
