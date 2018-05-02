const _ = require("underscore");
const fs = require("fs");

const songsRepository = require("../lib/repositories/songs-repository");
const lyricsRepository = require("../lib/repositories/lyrics-repository");

let songs = {};
let lyrics = {};

let unparsedLyrics = [];

let songDest = [];
let lyricDest = [];

songsRepository.getAllSongs()
  .then(result => {
    songs = result;

    _.each(songs, song => {
      const converted = {
        ID: song.id,
        Name: song.name,
        TamilText: song.trans_ta,
        TR_TamilText: song.name
      };

      if (song.lyrics) {
        const lyrics = JSON.parse(song.lyrics);

        let index = 1;
        _.each(lyrics, lyric => {
          lyric.song_id = song.id;
          lyric.order = index;
          index++;
        });

        unparsedLyrics = unparsedLyrics.concat(lyrics);
      }

      songDest.push(converted);
    });

    fs.writeFileSync(__dirname + "/songs.json", JSON.stringify(songDest, null, 2));

    return lyricsRepository.getAllLyrics();
  })
  .then(result => {
    lyrics = result;

    lyrics = lyrics.concat(unparsedLyrics);

    _.each(lyrics, lyric => {
      const converted = {
        ID: lyric.id,
        SongId: lyric.song_id,
        EnglishText: lyric.english,
        TamilText: lyric.trans_ta,
        Order: lyric.order
      };

      lyricDest.push(converted);
    });

    fs.writeFileSync(__dirname + "/lyrics.json", JSON.stringify(lyricDest, null, 2));

  });

