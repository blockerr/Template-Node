const {DataTypes, Model} = require('sequelize');
const db = require('../services/database');

class Home_slide extends Model {}
Home_slide.init({
    slide_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    images: DataTypes.STRING,
    creare_at: DataTypes.DATE,
    update_at: DataTypes.DATE,
}, { sequelize: db, modelName: 'home_slide'});


module.exports = Home_slide;