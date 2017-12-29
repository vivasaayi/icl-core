const BaseRepository = require("./base-repository");

const queries = {
  LYRICS_GET_BY_ID: "select * from lyrics where song_id=$1"
};

class CounterRepository extends BaseRepository {
  incrementCounter(id, type) {
    return this.execureStoredProcedure("increment_counter", [id]);
  }
}

module.exports = new CounterRepository();