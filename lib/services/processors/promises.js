var utils = require("../../utils/utils.js");

var processBookStoreValue = function (bookName) {
  var bookNameStoreValue = bookName.toLowerCase().replace(/ /g, "_");

  if (bookNameStoreValue === "songs_of_solomon") {
    bookNameStoreValue = "songs";
  }

  return bookNameStoreValue;
};

module.exports.processSave = function (model) {
  model.bookStoreValue = processBookStoreValue(model.book);
  model.date = utils.getDateObject(model.date);
}