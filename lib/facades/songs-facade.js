const songsService = require("../services/songs-service");

class SongsFacade {
  getLyricsIndex(skip, limit) {
    return songsService.getLyricsIndex(skip, limit)
  }

  getLyricById(lyricId) {
    return songsService.getLyricById(lyricId)
  }
}

module.exports = new SongsFacade();
