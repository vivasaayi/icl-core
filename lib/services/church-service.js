const churchRepository = require("../repositories/church-repository");

class ChurchService {
  getAllCurches() {
    return churchRepository.getAllChurches();
  }

  getChurchDetails(id) {
    if (id === "new") {
      const churchInfo = {
        id: "new",
        name: "",
        type: "",
        location: "",
        phone1: "",
        phone2: "",
        email: "",
        web: "",
        facebook: ""
      };

      return Promise.resolve(churchInfo);
    }


    return churchRepository.getChurchDetails(id)
      .then(results => {
        return results[0];
      });
  }

  saveChurchDetails(data) {
    return churchRepository.saveChurchDetails(data)
      .then(results => {
        console.log(results);
        return this.getChurchDetails(results.id);
      });
  }
}

module.exports = new ChurchService();
