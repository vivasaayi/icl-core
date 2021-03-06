const songsService = require("../services/songs-service");

class SongsFacade {
  getRecentSongs() {
    return songsService.getRecentSongs()
  }

  getAllSongs() {
    return songsService.getAllSongs()
  }

  getSongDetailsById(songId) {
    return songsService.getSongDetailsById(songId)
  }

  saveSong(song) {
    return songsService.saveSong(song);
  }
}

module.exports = new SongsFacade();
