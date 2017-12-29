var userDataRepository = require("../repositories/user-data-repository");
var _ = require("underscore");

const songsRepository = require("../repositories/songs-repository");
const lyricsRepository = require("../repositories/lyrics-repository");

class SongsService {
  getRecentSongs() {
    return songsRepository.getRecentSongs()
      .then(songs => {
        console.log("Recent Songs Fetched:", songs);

        return songs;
      });
  }

  getAllSongs() {
    return songsRepository.getAllSongs()
      .then(songs => {
        console.log("All Songs Fetched:", songs);

        return songs;
      });
  }

  getSongDetailsById(songId) {
    const data = {};

    return songsRepository.getSongById(songId)
      .then(songInfo => {
        data.songInfo = songInfo;

        return lyricsRepository.getLyricsById(songId);
      })
      .then(lyrics => {
        data.lyrics = lyrics;

        console.log("GET_SONGS_BY_ID", data);
        return data;
      });
  };
}

module.exports = new SongsService();