const churchService = require("../services/church-service");

class ChurchFacade {
  getAllCurches() {
    return churchService.getAllCurches();
  }

  getChurchDetails(id) {
    return churchService.getChurchDetails(id);
  }

  saveChurchDetails(data) {
    return churchService.saveChurchDetails(data);
  }
}

module.exports = new ChurchFacade();
