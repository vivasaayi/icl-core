const promiseService = require("./lib/services/promise-service");
const eventsService = require("./lib/services/events-service");
const moviesService = require("./lib/services/movies-service");
const songsService = require("./lib/services/songs-service");
const audioService = require("./lib/services/audio-service");

const promisesFacade = require("./lib/facades/promises-facade");

module.exports = {
  services: {
    promiseService,
    eventsService,
    moviesService,
    songsService,
    audioService
  },
  promisesFacade
}