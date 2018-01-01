const BaseRepository = require("./base-repository");

const queries = {
  LYRICS_GET_BY_ID: "select * from lyrics where song_id=$1"
};

class CounterRepository extends BaseRepository {
  incrementCounter(id, type) {
    return this.execureStoredProcedure("increment_counter", [id]);
  }

  getRowCount(tableName) {
    return this.executeQuery("select count(*) from " + tableName)
      .then(result => {
        return result[0]["count"];
      });
  }
}

module.exports = new CounterRepository();