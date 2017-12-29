const counterRepository = require("../repositories/counter-repository");

class CounterService {
  incrementCounter(id) {
    return counterRepository.incrementCounter(id);
  }
}


module.exports = new CounterService();