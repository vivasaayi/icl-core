const BaseRepository = require("./base-repository");
const uuid = require("uuid").v4;

const queries = {
  GET_ALL_CHURCHES: "SELECT  * FROM churches",
  INSERT_CHURCH: "insert into churches (id, name, type, location, phone1) values ($1,$2,$3,$4,$5)",
  GET_CHURCH_DETAILS: "SELECT  * FROM churches where id=$1",
  UPDATE_CHURCH: "update churches set name=$2, type=$3, location=$4, phone1=$5 where id=$1"
}

class ChurchRepository extends BaseRepository {
  getAllChurches() {
    return this.executeQuery(queries.GET_ALL_CHURCHES)
      .then((results) => {
        console.log(results);

        return results;
      });
  }

  addNewChurch(churchDetails) {
    const data = [
      churchDetails.id,
      churchDetails.name,
      churchDetails.type,
      churchDetails.location,
      churchDetails.phone1
    ];

    return this.executeQuery(queries.INSERT_CHURCH, data)
      .then((results) => {
        console.log(results);

        return churchDetails;
      });
  }

  updateChurch(churchDetails) {
    const data = [
      churchDetails.id,
      churchDetails.name,
      churchDetails.type,
      churchDetails.location,
      churchDetails.phone1
    ];

    return this.executeQuery(queries.UPDATE_CHURCH, data)
      .then((results) => {
        console.log(results);

        return churchDetails;
      });
  }

  getChurchDetails(id) {
    return this.executeQuery(queries.GET_CHURCH_DETAILS, [id])
      .then((results) => {
        console.log(results);

        return results;
      });
  }

  saveChurchDetails(churchDetails) {
    if (churchDetails.id === "new") {
      churchDetails.id = uuid();
      return this.addNewChurch(churchDetails);
    }

    return this.updateChurch(churchDetails);
  }
}

module.exports = new ChurchRepository();