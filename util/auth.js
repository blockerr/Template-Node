const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authentcicate = (process.env.AUTHENTICATE === "true");

const authorization = function (req, res, next) {
  if (authentcicate == false) {
    const decoded = {
      user_id: 1,
      role: 'user'
    };
    req.headers['token'] = decoded;
    next();
  } else {
    const token = req.headers['authorization'];
    if (token == undefined) {
      res.status(403).json();
    } else {
      jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
          res.status(403).json();
        } else {
          req.headers['token'] = decoded;
          next();
        }
      });
    };
  }
}

module.exports = authorization;
