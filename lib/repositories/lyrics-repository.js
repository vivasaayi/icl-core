const BaseRepository = require("./base-repository");

const queries = {
  LYRICS_GET_BY_ID: "select * from lyrics where song_id=$1"
};

class LyricsRepository extends BaseRepository {
  getLyricsById(songId) {
    return this.executeQuery(queries.LYRICS_GET_BY_ID, [songId])
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

module.exports = new LyricsRepository();