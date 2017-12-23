var schemaRepository = require("../repositories/schema-repository");
var userDataRepository = require("../repositories/user-data-repository");
var schemas = require("../schema/schemas");
var _ = require("underscore");
var urlEncoding = require('querystring');
var moment = require("moment");
var promiseService = require("./promise-service");

module.exports.renderIndexPage = function (req, res) {
  
  var date = new Date();
  var promise = {
    promise: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
    book: "Isaiah",
    chapter: "40",
    verse: "10",        
    bookStoreValue: "isaiah"
  };

  promiseService.getTodaysPromise(function (err, result) {
    if (!err && result) {
      promise.book = result.book;
      promise.promise = result.text;
      promise.chapter = result.chapter;
      promise.verse = result.verse;
      promise.bookStoreValue = result.bookStoreValue;
    }
    
    var data = {
      layout: false,
      dayOfMonth: moment().format("Do"),
      dayOfWeek: moment().format("dddd"),
      month: moment().format("MMMM"),
      promise: promise.promise,
      book: promise.book,
      chapter: promise.chapter,
      verse: promise.verse,
      more: "http://biblehub.com/" + promise.bookStoreValue + "/" + promise.chapter + "-" + promise.verse + ".htm"
    };
    
    res.render('index', data);
  });
};

module.exports.render = function (req, res) {
  var term = req.params.term;

  if (term === "lyrics") {
    var summarySchema = schemas["lyrics-summary"];
    userDataRepository.loadAll("lyrics", function (err, resoponse) {
      if (err) {
        return res.render("lyricslist", {error: err});
      } else {
        return res.render("lyricslist", {lyrics: resoponse, title: "Indian Christian Literature - Lyrics"});
      }
    });
  } else if (term === "music") {
    userDataRepository.loadAll("lyrics", function (err, resoponse) {
      if (err) {
        return res.render("music", {error: err, title: "Indian Christian Literature - Music"});
      } else {
        return res.render("music", {lyrics: extractMusics(resoponse), title: "Indian Christian Literature - Music"});
      }
    });
  }
  else if (term === "videos") {
    userDataRepository.loadAll("lyrics", function (err, resoponse) {
      if (err) {
        return res.render("videos", {error: err, title: "Indian Christian Literature - Videos"});
      } else {
        return res.render("videos", {lyrics: extractVideos(resoponse), title: "Indian Christian Literature - Videos"});
      }
    });
  }
  else if (term === "events") {
    return res.render("events");
  }
  else {
    return res.render("lyricslist", {error: "You have requested an invalid resource."});
  }
};

function extractMusics(data){
  var result = [];
  
  _.each(data, function(item){
    var d = {
      name: item.name,
      soundCloud: extractMusic(item)
    };

    if(d.soundCloud.length > 0){
      result.push(d);
    }
  });

  return result;
}

function extractVideos(data){
  var result = [];

  _.each(data, function(item){
    var d = {
      name: item.name,
      youTube: extractVideo(item)
    };

    if(d.youTube.length > 0){
      result.push(d);
    }
  });

  return result;
}

function extractMusic (data) {
  var soundCloud = [];

  _.each(data.musics, function (music) {
    if (music.type === "soundcloud") {
      var escapedUrl = urlEncoding.escape(music.url);
      soundCloud.push({url: escapedUrl});
    }
  });

  return soundCloud;
}

function extractVideo (data) {
  var youTube = [];

  _.each(data.videos, function (video) {
    if (video.type === "youtube") {
      youTube.push({url: video.url});
    }
  });

  return youTube;
}

module.exports.renderItem = function (req, res) {
  var term = req.params.term;

  if (term === "lyrics") {
    var params = req.params.id.split("-");
    userDataRepository.loadById(term, params[0], function (err, resoponse) {
      if (err) {
        return res.render("lyrics", {error: err});
      } else {
        var content = [];
        _.each(resoponse.content, function (stanza) {
          if (stanza.text) {
            var lines = stanza.text.split("\n");
            content.push({stanza: lines});
          }
        });
        
        resoponse.youTube = extractVideo(resoponse);
        resoponse.soundCloud = extractMusic(resoponse);
        resoponse.content = content;

        return res.render("lyrics", {lyrics: resoponse, title: "Indian Christian Literature - Lyric - " + resoponse.name});
      }
    });
  }
  else {
    return res.render("lyrics", {error: "You have requested an invalid resource."});
  }
};