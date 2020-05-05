const Admin = require('../models/admin');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  signup: async (req, res) => {
    try {
      const data = req.body;
      data.password = await bcrypt.hash(data.password, 10);
      data.create_at = moment().format();
      data.update_at = moment().format();
      data.role = "empl"
      const findEmail = await Admin.findOne({ where: { email: data.email } });
      const findUsername = await Admin.findOne({ where: { username: data.username } });

      if (findEmail != null && findUsername == null) {
        const err = [{
          error: findEmail.email + " " + process.env.ERROR_MESSAGE,
          field: "email"
        }];
        return res.status(400).json(err);
      }

      if (findEmail == null && findUsername != null) {
        const err = [{
          error: findUsername.username + " " + process.env.ERROR_MESSAGE,
          field: "username"
        }];
        return res.status(400).json(err);
      }

      if (findEmail != null && findUsername != null) {
        const err = [{
          error: findEmail.email + " " + process.env.ERROR_MESSAGE,
          field: "username"
        }, {
          error: findUsername.username + " " + process.env.ERROR_MESSAGE,
          field: "username"
        }];
        return res.status(400).json(err);
      }
      const newAdmin = await Admin.create(data);
      return res.status(201).json(newAdmin);
    } catch (err) {
      return res.status(500)
    }
  },

  signin: async (req, res) => {
    try {
      const loginData = await req.body;
      const findUser = await Admin.findOne({ where: { username: loginData.username } });
      if (findUser == null) {
        const err = [{
          error: 'username không tồn tại',
          field: "username"
        }];
        return res.status(404).json(err);
      }

      bcrypt.compare(loginData.password, findUser.dataValues.password, (err, result) => {
        if (result) {
          const token = jwt.sign({
            id: findUser.id,
            role: findUser.role,
            email: findUser.email,
            username: findUser.username
          }, process.env.SECRET, {
            expiresIn: '24d'
          });
          return res.status(200).json({ token: token });
        };
        const err_msg = [{
          error: 'password không đúng',
          field: "password"
        }];
        return res.status(403).json(err_msg);
      })
    } catch (err) {
      return res.status(500)
    }
  }
}