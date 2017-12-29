/* eslint no-console: 0 */

const winston = require("winston");
const _ = require("underscore");

class Logger {
  info(message, data) {
    winston.log("info", message, data);
  }

  debug(message, data) {
    //winston.debug("debug", message, data);
    console.log(message, data);
  }

  log(message, data) {
    winston.log("info", message, data);
  }

  error(error, location) {
    const data = error.data || "";
    let errorMessage = error.message || "";

    if (error.messages) {
      _.each(error.messages, (msg) => {
        errorMessage = errorMessage + ";" + msg;
      });
    }

    winston.log("error", {
      location,
      code: error.code,
      errorMessage,
      data
    });
  }
}

module.exports = new Logger();
