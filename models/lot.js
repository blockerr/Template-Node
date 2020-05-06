const {DataTypes, Model} = require('sequelize');
const db = require('../services/database');

class Lot extends Model {}
Lot.init({
  lot_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  }, 
  lotNumber: DataTypes.STRING,  // lô số ..
  location: DataTypes.ARRAY(DataTypes.STRING), // vị trí 4 góc
  avatar: DataTypes.STRING,
  acreage: DataTypes.STRING, // diện tích 
  create_at: DataTypes.DATE,
  update_at: DataTypes.DATE,
}, { sequelize: db, modelName: 'lot' });
  
module.exports = Lot;