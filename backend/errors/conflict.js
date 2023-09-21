const { conflict } = require('./errorCodes');

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = conflict;
  }
}
module.exports = Conflict;
