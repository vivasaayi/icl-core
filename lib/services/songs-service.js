var userDataRepository = require("../repositories/user-data-repository");
var _ = require("underscore");

const songsRepository = require("../repositories/songs-repository");

var SongsService = function () {

};

SongsService.prototype.getLyricsIndex = function (skip, limit, callback) {
  var query = {
    skip: 0,
    //limit: 10,
    query: {}
  };

  this.processQuery(query, null, callback);
};

SongsService.prototype.getTopLyrics = function () {
  var filter = {
    limit: 6
  };

  return songsRepository.getSongs(filter)
    .then(songs => {
      console.log("SONGS Fetched:", songs);

      return songs;
    });
};

SongsService.prototype.getLyricById = function (lyricId, callback) {
  var query = {
    query: {
      _id: lyricId
    }
  };

  return songsRepository.getSongsById(lyricId)
    .then(results => {
      var data = {
        lyric: results,
        stanzas: []
      };

      console.log("GET_SONGS_BY_ID", data);

      callback(data);
    });

};

SongsService.prototype.getStanzasById = function (lyricId, callback) {
  var query = {
    query: {
      _parent: lyricId
    },
    sort: { ORDER: 1 }
  };

  this.processQuery(query, "LYRICS", function (err, stanzas) {
    _.each(stanzas, function (stanza) {
      stanza.TAMILTEXT = stanza.TAMILTEXT.replace(new RegExp("\n", "g"), "<br />");
    });
    callback(null, stanzas);
  });
};

SongsService.prototype.processQuery = function (query, collection, callback) {
  userDataRepository.customQueryV1(collection || "SONGS", query, function (err, result) {
    console.dir(result);
    callback(null, result);
  });
}

module.exports = new SongsService();