const _ = require("underscore");
const uuid = require("uuid").v4;

const songs = require("./songs.json");
const lyrics = require("./lyrics.json");

const pgp = require("pg-promise")();

const database = process.env.PGDATABASE || "icl-dot-net-core";
const user = process.env.PGUSER || "localtest";
const password = process.env.PGPASSWORD || "localtest";
const host = process.env.PGHOST || "localhost";
const port = process.env.PGPORT || 5432;

// create a config to configure both pooling behavior 
// and client options 
// note: all config is optional and the environment variables 
// will be read if the config is not present 

const config = {
  user,
  database,
  password,
  host,
  port,
  max: 10, // max number of clients in the pool 
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
};

// this initializes a connection pool 
// it will keep idle connections open for 30 seconds 
// and set a limit of maximum 10 idle clients 
const db = pgp(config);

class PGWrapper {
  static executeQuery(query, params) {
    console.log("ExecuteQuery Start:", query);

    const startTime = new Date();
    return db.any(query, params)
      .then((data) => {
        console.log("ExecuteQuery Completed:", query, ":", new Date() - startTime, "ms");
        return data;
      })
      .catch((error) => {
        console.log("ExecuteQuery:Error:", error);
        return error;
      });
  }
}

const INSERT_SONG_QUERY = `INSERT INTO "Song" ("ID", "Name", "TamilText", "TR_TamilText", "ReleaseYear") values ($1, $2, $3, $4, 0)`;
const INSERT_LYRIOC_QUERY = `INSERT INTO "Lyric" ("ID", "SongId", "EnglishText", "TamilText", "Order") values ($1, $2, $3, $4, $5)`;

function saveSong(song) {
  const params = [
    song.ID,
    song.TR_TamilText,
    song.TamilText,
    song.TR_TamilText
  ];

  return PGWrapper.executeQuery(INSERT_SONG_QUERY, params)
    .then((results) => {
      console.log(results);

      return results;
    });
}

const visitedLyricIds = {};

function saveLyric(lyric) {
  if (lyric.ID.indexOf("new") > -1) {
    lyric.ID = uuid();
  }

  if (visitedLyricIds[lyric.ID]) {
    lyric.ID = uuid();
  }

  visitedLyricIds[lyric.ID] = lyric.ID;

  const params = [
    lyric.ID,
    lyric.SongId,
    lyric.EnglishText,
    lyric.TamilText,
    lyric.Order
  ];

  return PGWrapper.executeQuery(INSERT_LYRIOC_QUERY, params)
    .then((results) => {
      console.log(results);

      return results;
    });
}

const songProms = [];
_.each(songs, song => {
  songProms.push(saveSong(song))
});

const lyricProms = [];
_.each(lyrics, lyric => {
  lyricProms.push(saveLyric(lyric))
});

Promise.all(songProms)
  .then(result => {
    console.log("Songs Imported");
    return Promise.all(lyricProms);
  })
  .then(result => {
    console.log("Lyrics Imported")
  })
  .catch(err => {
    console.log(err);
  })