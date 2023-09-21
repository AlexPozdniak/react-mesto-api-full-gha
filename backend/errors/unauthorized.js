const { unauthorized } = require('./errorCodes');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = unauthorized;
  }
}
module.exports = Unauthorized;
