const {DataTypes, Model} = require('sequelize');
const db = require('../services/database');

class Lot extends Model {}
Lot.init({
  lot_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  }, 
  lotNumber: DataTypes.INTEGER,  // lô số ..
  location: DataTypes.ARRAY(DataTypes.JSON), // vị trí 4 góc
  avatar: DataTypes.ARRAY(DataTypes.STRING),
  acreage: DataTypes.STRING, // diện tích 
  address: DataTypes.STRING,
  create_at: DataTypes.DATE,
  update_at: DataTypes.DATE,
}, { sequelize: db, modelName: 'lot' }); 
  
module.exports = Lot; 