const Lot = require('../models/lot');
const Investor = require('../models/investor');
const moment = require('moment');

module.exports = {
    create: async (req, res, next) => {
        try {
            const data = req.body;
            data.create_at = moment().format();
            data.update_at = moment().format();
            const lotPosition = await Lot.findOne({ where: { lotNumber: data.lotNumber } });
            if (lotPosition) {
                const err_msg = [{
                    error: 'Vị trí lô đất đã tồn tại',
                    field: "lotPosition"
                }]
                return res.status(400).json(err_msg);
            }
            const newLot = await Lot.create(data);
            return res.status(201).json(newLot);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    list: async (req, res, next) => {
        try {
            const list = await Lot.findAll({ include: [{ model: Investor }] });
            return res.status(200).json(list);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    lot: async (req, res, next) => {
        try {
            const { lotNumber } = req.params;
            console.log(lotNumber)
            const lot = await Lot.findOne({ where: { lotNumber: lotNumber } });
            if (!lot) {
                const err_msg = [{
                    error: 'Không tìm thấy',
                    field: "lotPosition"
                }]
                return res.status(404).json(err_msg)
            }
            console.log(lot.dataValues)
            return res.status(200).json(lot.dataValues);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}