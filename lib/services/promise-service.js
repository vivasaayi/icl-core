var _ = require("underscore");
var moment = require("moment");

const promiseRepository = require("../repositories/promise-repository");
var userDataRepository = require("../repositories/user-data-repository");
var utils = require("../utils/utils.js");
var logger = require("../utils/logger");

class PromiseService {
  getDefaultPromise() {
    var promise = {
      text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
      book: "Isaiah",
      chapter: "40",
      verses: "10",
      book_alternative: "isaiah"
    };

    return promise;
  }

  formatPromise(results) {
    let promise = this.getDefaultPromise();

    if (results.length > 0) {
      promise = results[0];
    }

    promise.more = "http://biblehub.com/" + promise.book_alternative + "/" + promise.chapter + "-" + promise.verses + ".htm";

    logger.log("Formatted Promise:", promise);

    return promise;
  }

  getTodaysPromise() {
    var dateString = moment().format("YYYY-MM-DD");

    return promiseRepository.fetchPromiseByDate(dateString)
      .then((results) => {
        logger.log("Promises Fetched", results);

        return this.formatPromise(results);
      })
      .catch(err => {
        logger.error("Error fetching promise", err);

        return this.formatPromise([]);
      });
  }

  createPromise(promiseDetails, next) {
    if (_.isEmpty(promiseDetails)) {
      logger.error("You should pass Promises object", next);
      return;
    }

    if (_.isEmpty(promiseDetails.book)) {
      logger.error("Book Name should not be empty", next);
      return;
    }

    if (!_.isNumber(promiseDetails.chapter)) {
      logger.error("Chapter should not be empty", next);
      return;
    }

    if (!_.isNumber(promiseDetails.verse)) {
      logger.error("Verse should not be empty", next);
      return;
    }

    if (_.isEmpty(promiseDetails.text)) {
      logger.error("Verse Text should not be empty", next);
      return;
    }

    logger.info("Creating new Promise");

    var date = utils.getTodaysDateObject();

    var promiseToSave = {
      date: date,
      book: promiseDetails.book,
      chapter: promiseDetails.chapter,
      verse: promiseDetails.verse,
      text: promiseDetails.text,
      bookStoreValue: processBookStoreValue(promiseDetails.book)
    };

    var query = { date: date };

    userDataRepository.loadByQuery("promises", query, function (err, result) {
      if (err) {
        logger.error("Error getting promises. Error:" + err);
      }
      else {
        if (result) {
          logger.info("Promise already exists andso updating - " + result._id.toString());
          promiseToSave._id = result._id.toString();
        }
        userDataRepository.save("promises", promiseToSave, function (err, response) {
          logger.info("Promise saved.");
          next(err, response);
        });
      }
    });

    function processBookStoreValue(bookName) {
      var bookNameStoreValue = bookName.toLowerCase().replace(/ /g, "_");

      if (bookNameStoreValue === "songs_of_solomon") {
        bookNameStoreValue = "songs";
      }

      return bookNameStoreValue;
    }
  }
}

module.exports = new PromiseService();
