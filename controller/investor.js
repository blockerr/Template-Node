const Investor = require('../models/investor');
const Lot = require('../models/lot');
const moment = require('moment');
const dotenv = require('dotenv');
const uuid = require('../util/uuid');
const fs = require('fs');
dotenv.config();

module.exports = {
    create: async (req, res, next) => {
        try {
            const data = req.body;
            data.expire_date = moment(data.expire_date).format('L');
            data.hire_date = moment(data.hire_date).format('L');
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
            const list = await Investor.findAll({ order: [['lot_id', 'ASC']] });
            return res.status(200).json(list);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    investor: async (req, res, next) => {
        try {
            const { id } = req.params;
            const findInvestor = await Investor.findOne({ where: { investor_id: id } });
            if (!findInvestor) {
                const err_msg = [{
                    error: 'Nhà đầu tư này không tồn tại',
                    field: "investor_id"
                }]
                return res.status(404).json(err_msg);
            }

            return res.status(200).json(findInvestor);

        } catch (err) {
            return res.status(500).json(err)
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const investor = req.body;

            investor.hire_date = moment(investor.hire_date).format('L');
            investor.expire_date = moment(investor.expire_date).format('L');
            investor.update_at = moment().format();
            console.log(investor)

            const newInvestor = await Investor.update(investor, { where: { investor_id: id } });
            if (newInvestor == 0) {
                const err_msg = [{
                    error: 'Không tìm thấy nhà đầu tư',
                    field: "investor_id"
                }]
                return res.status(404).json(err_msg);
            }
            return res.status(200).json(newInvestor)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const deleteInvestor = await Investor.destroy({ where: { investor_id: id } });
            if (deleteInvestor == 0) {
                return res.status(404).json('Không tìm thấy nhà đầu tư');
            }
            return res.status(200).json()
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    updateAvatar: async (req, res, next) => {
        try {
            const { id } = req.params;
            const file = req.file
            const dir = process.env.PATH_FILE;
            const fileName = uuid.uuid() + '_' + file.originalname;
            const path = fileName
            const findOldAvatar = await Investor.findOne({ where: { investor_id: id } });
            if (!findOldAvatar) {
                err_msg = [{
                    error: 'Không tồn tại nhà đầu tư',
                    field: "Avatar"
                }]
                return res.status(404).json(err_msg)
            }
            if (findOldAvatar.avatar != null) {
                fs.unlink(dir + '/' + findOldAvatar.avatar, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            }

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            fs.writeFile(`${dir}/${fileName}`, file.buffer, function (err) {
                if (err) {
                    return res.status(400).json('Không thể lưu file')
                }
            });
            const updateEmpl = await Investor.update({ avatar: path }, { where: { investor_id: id }, returning: true })
            if (updateEmpl == 0) {
                const err_msg = [{
                    error: 'Không tồn tại nhà đầu tư',
                    field: "avatar"
                }]
                return res.status(400).json(err_msg);
            }

            return res.status(200).json(updateEmpl[1])
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    }
}