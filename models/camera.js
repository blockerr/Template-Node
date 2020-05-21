const {DataTypes, Model} = require('sequelize');
const db = require('../services/database');

class Camera extends Model {}
Camera.init({
    camera_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    lot_id: DataTypes.INTEGER,
    cameraMunber: DataTypes.STRING,
    avatar: DataTypes.STRING,
    creare_at: DataTypes.DATE,
    update_at: DataTypes.DATE,
}, { sequelize: db, modelName: 'camera'});


module.exports = Camera;