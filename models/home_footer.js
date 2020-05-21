const {DataTypes, Model} = require('sequelize');
const db = require('../services/database');

class Home_footer extends Model {}
Home_footer.init({
    footer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title1: DataTypes.STRING,
    content1: DataTypes.STRING,
    content2: DataTypes.STRING,
    content3: DataTypes.STRING,
    title2: DataTypes.STRING,
    comanyname: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    fax: DataTypes.STRING,
    email: DataTypes.STRING,
    title3: DataTypes.STRING,
    socialNetwork: DataTypes.STRING,
    creare_at: DataTypes.DATE,
    update_at: DataTypes.DATE,
}, { sequelize: db, modelName: 'home_footer'});

module.exports = Home_footer;