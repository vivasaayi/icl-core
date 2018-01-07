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

    if (songId === "new") {
      return Promise.resolve({
        songInfo: {
          id: "new"
        },
        lyrics: []
      });
    }

    return songsRepository.getSongById(songId)
      .then(songInfo => {
        data.songInfo = songInfo;

        console.log(songInfo);

        data.lyrics = JSON.parse(songInfo.lyrics) || [];

        return data;
      });
  };

  saveSong(song) {
    const songInfo = {
      id: song.songInfo.id,
      name: song.songInfo.name,
      trans_ta: song.songInfo.trans_ta,
      lyrics: song.lyrics
    };

    console.log("Song Info:", songInfo);
    console.log("Song:", song)

    return songsRepository.saveSong(songInfo)
      .then(() => {
        return this.getSongDetailsById(songInfo.id);
      });
  }

  migrate() {
    return songsRepository.getAllLyrics()
      .then(lyrics => {
        const grouped = _.groupBy(lyrics, "song_id");

        _.each(lyrics, lyric => {
          delete lyric.song_id;
        });

        const proms = [];

        _.each(Object.keys(grouped), key => {
          const lyrics = grouped[key];

          console.log(JSON.stringify(lyrics), key);

          proms.push(songsRepository.updateSong({
            id: key,
            lyrics
          }));

          return Promise.all(proms);
        })
      });
  }
}

const songsService = new SongsService()

module.exports = songsService;

// songsService.migrate()
//   .then(result => {
//     console.log("Completed");
//   })
//   .catch(error => {
//     console.log(error);
//   })