const Home_community = require('../models/home_community');
const moment = require('moment');

module.exports = {
    create: async (req, res, next) => {
        try {
            const data = req.body;
            data.create_at = moment().format();
            data.update_at = moment().format();
            const newHome_community = await Home_community.create(data);
            return res.status(201).json(newHome_community);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    list: async (req, res, next) => {
        try {
            const list = await Home_community.findAll();
            return res.status(200).json(list);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}