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
            admin_id: findUser.admin_id,
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
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      data.update_at = moment().format();
      const findUserName = await Admin.findOne({ where: { username: data.username } });
      const findUserEmail = await Admin.findOne({ where: { email: data.email } });

      if (findUserName != null && findUserEmail != null && findUserName.admin_id != id && findUserEmail.admin_id != id) {
        const err_msg = [{
          error: 'username đã tồn tại',
          field: "username"
        }, {
          error: 'email đã tồn tại',
          field: "email"
        }];
        return res.status(400).json(err_msg);
      }
      if (findUserName != null && findUserName.admin_id != id) {
        const err_msg = [{
          error: 'username đã tồn tại',
          field: "username"
        }];
        return res.status(400).json(err_msg);
      }
      if (findUserEmail != null && findUserEmail.admin_id != id) {
        const err_msg = [{
          error: 'email đã tồn tại',
          field: "email"
        }];
        return res.status(400).json(err_msg);
      }
      const updateUser = await Admin.update(data, { where: { admin_id: id }, returning: true });
      return res.status(200).json(updateUser[1])
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  list: async (req, res, next) => {
    try {
      const list = await Admin.findAll();
      return res.status(200).json(list);
    } catch (err) {
      return res.status(500).json();
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const decoded = req.headers['token'];
      const id = decoded.admin_id;
      const { password, new_password } = req.body;
      const newPassword = await bcrypt.hash(new_password, 10);
      const update_at = moment().format();
      const userExist = await Admin.findOne({ where: { admin_id: id } });
      if (userExist == null) {
        return res.status(404).json();
      }
      await bcrypt.compare(password, userExist.dataValues.password, (err, result) => {
        if (result) {
          Admin.update({ password: newPassword, update_at: update_at }, { where: { admin_id: id } });
          return res.status(200).json();
        }
        return res.status(403).json();
      })
    }
    catch (err) {
      logging.error(err);
      return res.status(500).json();
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteUser = await Admin.destroy({ where: { admin_id: id } });
      console.log(deleteUser)
      if (!deleteUser) {
        return res.status(404).json();
      }
      return res.status(200).json();
    } catch (err) {
      return res.status(500).json(err);
    }
  }

}