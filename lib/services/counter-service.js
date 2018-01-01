const counterRepository = require("../repositories/counter-repository");

class CounterService {
  incrementCounter(id) {
    return counterRepository.incrementCounter(id);
  }

  getSongsCount() {
    return counterRepository.getRowCount("songs");
  }

  getVideosCount() {
    return counterRepository.getRowCount("videos");
  }
}


module.exports = new CounterService();