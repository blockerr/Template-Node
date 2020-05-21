const Home_slide = require('../models/home_slide');
const moment = require('moment');

module.exports = {
    create: async (req, res, next) => {
        try {
            const data = req.body;
            data.create_at = moment().format();
            data.update_at = moment().format();
            const newHome_slide = await Home_slide.create(data);
            return res.status(201).json(newHome_slide);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    list: async (req, res, next) => {
        try {
            const list = await Home_slide.findAll();
            return res.status(200).json(list);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}