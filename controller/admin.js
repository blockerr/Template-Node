const Admin = require('../models/admin');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const uuid = require('../util/uuid');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  signup: async (req, res) => {
    try {
      const data = req.body;
      data.password = await bcrypt.hash(data.password, 10);
      data.birthday = moment(data.birthday).format('L'); 
      data.create_at = moment().format();
      data.update_at = moment().format();
      data.role = "Nhân viên";
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
      const loginData = req.body;
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
      data.birthday = moment(data.birthday).format('L'); 
      data.update_at = moment().format();
      console.log(data)
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
      const list = await Admin.findAll({ order: [['admin_id', 'ASC']] });
      return res.status(200).json(list);
    } catch (err) {
      return res.status(500).json(err);
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
      if (!deleteUser) {
        return res.status(404).json();
      }
      return res.status(200).json();
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  employee: async (req, res, next) => {
    try {
      const { id } = req.params;
      const empl = await Admin.findOne({ where: { admin_id: id } });
      if (!empl) {
        return res.status(404).json();
      }
      return res.status(200).json(empl);
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
      const findOldAvatar = await Admin.findOne({where: {admin_id: id}});
      if (!findOldAvatar){
        err_msg = [{
          error: 'Không tồn tại người dùng',
          field: "Avatar"
        }]
        return res.status(404).json(err_msg)
      }
      if (findOldAvatar.avatar != null){
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
      const updateEmpl = await Admin.update({ avatar: path }, { where: { admin_id: id }, returning: true  })
      if (updateEmpl == 0){
        const err_msg = [{
          error: 'Không tồn tại người dùng',
          field: "avatar"
        }]
        return res.status(400).json(err_msg);
      }

      return res.status(200).json(updateEmpl[1])
    } catch (err) {
      return res.status(500).json(err)
    }
  }


}