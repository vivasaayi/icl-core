const BaseRepository = require("./base-repository");
const uuid = require("uuid").v4;

const queries = {
  SONGS_GET_BY_ID: "select * from songs where id=$1",
  SONGS_GET_ALL: "select s.*, c.counter from songs s left join counter c on s.id = c.id",
  SONGS_INSERT: "INSERT INTO songs (id, name, trans_ta, lyrics) values ($1, $2, $3, $4)",
  SONGS_UPDATE: "update songs set name=$2, trans_ta=$3, lyrics=$4 where id=$1"
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

  addNewSong(song) {
    const params = [
      song.id,
      song.name,
      song.trans_ta,
      JSON.stringify(song.lyrics)
    ];

    return this.executeQuery(queries.SONGS_INSERT, params)
      .then((results) => {
        console.log(results);

        return results;
      });
  }

  updateSong(song) {
    const params = [
      song.id,
      song.name,
      song.trans_ta,
      JSON.stringify(song.lyrics)
    ];

    return this.executeQuery(queries.SONGS_UPDATE, params)
      .then((results) => {
        console.log(results);

        return results;
      });
  }

  saveSong(song) {
    if (song.id === "new") {
      song.id = uuid();
      return this.addNewSong(song);
    }

    return this.updateSong(song);
  }

  getAllLyrics() {
    return this.executeQuery("SELECT * FROM LYRICS")
      .then((results) => {
        return results;
      });
  }
}

module.exports = new SongsRepository();