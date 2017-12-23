const BaseRepository = require("./base-repository");

const queries = {
  SONGS_GET_BY_ID: "select * from songs where id=$1"
};

class SongsRepository extends BaseRepository {
  getSongsById(songId) {
    return this.executeQuery(queries.SONGS_GET_BY_ID, [songId])
      .then((results) => {
        console.log(results);

        return results;
      });
  }

  getSongs(filter) {
    let query = this.buildQuery("songs");

    return this.executeQuery(query, [])
      .then((results) => {
        console.log(results);

        return results;
      });
  }
}

module.exports = new SongsRepository();