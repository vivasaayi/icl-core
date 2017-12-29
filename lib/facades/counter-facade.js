const counterService = require("../services/counter-service");

class CounterFacade {
  incrementCounter(id) {
    console.log("INCREMENT:", id);
    return counterService.incrementCounter(id)
      .catch(err => {
        console.log("INCREMENT:", err);
      })
  }
}

module.exports = new CounterFacade();