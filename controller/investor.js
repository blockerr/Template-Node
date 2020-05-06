const Investor = require('../models/investor');
const Lot = require('../models/lot');
const moment = require('moment');
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
    create: async (req, res, next) => {
        try {
            const data = req.body;
            data.create_at = moment().format();
            data.update_at = moment().format();
            const findCompanyName = await Investor.findOne({ where: { companyName: data.companyName } });
            const findEmail = await Investor.findOne({ where: { email: data.email } });
            const findLotID = await Investor.findOne({ where: { lot_id: data.lot_id } });
            const findLot = await Lot.findOne({ where: { lot_id: data.lot_id } });

            if (findCompanyName) {
                const err_msg = [{
                    error: 'Tên công ty đã tồn tại',
                    field: "companyName"
                }]
                return res.status(400).json(err_msg);
            }
            if (findEmail) {
                const err_msg = [{
                    error: 'Email đã tồn tại',
                    field: "email"
                }]
                return res.status(400).json(err_msg);
            }
            if (findLotID) {
                const err_msg = [{
                    error: 'Lô đát đã được thuê',
                    field: "lot_id"
                }]
                return res.status(400).json(err_msg);
            }
            if (!findLot) {
                const err_msg = [{
                    error: 'Lô đát không tồn tại',
                    field: "lot_id"
                }]
                return res.status(400).json(err_msg);
            }
            const newInvestor = await Investor.create(data);
            return res.status(201).json(newInvestor);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    list: async (req, res, next) => {
        try {
            const list = await Investor.findAll();
            return res.status(200).json(list);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}