const BaseRepository = require("./base-repository");

const queries = {
  SONGS_GET_BY_ID: "select * from songs where id=$1",
  SONGS_GET_ALL: "select s.*, c.counter from songs s left join counter c on s.id = c.id"
};

class SongsRepository extends BaseRepository {
  getSongById(songId) {
    return this.executeQuery(queries.SONGS_GET_BY_ID, [songId])
      .then((results) => {
        console.log(results);

        return results[0];
      });
  }

  getAllSongs() {
    return this.executeQuery(queries.SONGS_GET_ALL)
      .then((results) => {
        console.log(results);

        return results;
      });
  }

  getRecentSongs() {
    return this.executeQuery(queries.SONGS_GET_ALL + " limit 10")
      .then((results) => {
        console.log(results);

        return results;
      });
  }
}

module.exports = new SongsRepository();