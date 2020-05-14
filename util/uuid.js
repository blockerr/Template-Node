const { v4: uuidv4 } = require('uuid');

module.exports = {
  uuid: () => {
    return uuidv4()
  }
}