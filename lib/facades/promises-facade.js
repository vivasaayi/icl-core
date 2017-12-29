const promiseService = require("../services/promise-service");

class PromisesFacade {
  getTodaysPromise() {
    return promiseService.getTodaysPromise();
  }
}

module.exports = new PromisesFacade();