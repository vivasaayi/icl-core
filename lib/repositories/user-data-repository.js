// var MongoWrapper = require("dal").MongoWrapper;
// var objectId = require("mongodb").ObjectID;

module.exports.getContacts = function () {

};

module.exports.save = function (collectionName, document, callback) {
  if (document._id) {
    MongoWrapper.updateDocument(collectionName, document)
      .then(function (result) {
        callback(null, result);
      });
  }
  else {
    document._id = MongoWrapper.getObjectId();
    MongoWrapper.insertDocument(collectionName, document)
      .then(result => {
        callback(null, result);
      });
  }
};

module.exports.delete = function (collectionName, document, callback) {
  if (document._id) {
    database.deleteDocument(collectionName, document, function (err, result) {
      callback(err, result);
    });
  }
};

module.exports.loadSummary = function (collectionName, fields, callback) {
  database.loadSelectedFields(collectionName, {}, fields, function (err, result) {
    callback(err, result);
  });
};

module.exports.loadAll = function (collectionName, callback) {
  MongoWrapper.customQuery(collectionName, { query: {} })
    .then(function (result) {
      callback(null, result);
    });
};

module.exports.loadById = function (collectionName, id, callback) {
  var query = {
    "_id": id
  };

  MongoWrapper.customQuery(collectionName, { query })
    .then(function (result) {
      callback(null, result);
    });
};

module.exports.loadWithLimit = function (collectionName, limit, callback) {
  console.log("Loading " + collectionName);
  const query = {};

  MongoWrapper.customQuery(collectionName, { query, limit })
    .then((result) => {
      callback(null, result);
    });
};

module.exports.findAllByQuery = function (collectionName, query, callback) {
  MongoWrapper.customQuery(collectionName, { query })
    .then((result) => {
      callback(null, result);
    });
};

module.exports.findOneByQuery = function (collectionName, query, callback) {
  MongoWrapper.findOneByQuery(collectionName, query)
    .then(result => {
      callback(null, result);
    });
};

module.exports.customQueryV1 = function (collectionName, query, callback) {
  MongoWrapper.customQuery(collectionName, query)
    .then(function (results) {
      callback(null, results);
    });
};

module.exports.customQuery = function (collectionName, query, sort, limit, callback) {
  var options = {
    query: query,
    sort: sort,
    limit: limit
  };

  if (sort && limit) {
    options.hint = "queryWithSortAndLimit";
  }

  database.customQuery(collectionName, query, function (err, result) {
    callback(err, result);
  });
};

module.exports.new = function (req, res) {
  var employees = [
    {
      empNo: 500,
      name: 'Rajan',
      active: true,
      homeCode: 'VLR'
    },
    {
      empNo: 501,
      name: 'Rajan',
      active: true,
      homeCode: 'VLR'
    },
    {
      empNo: 502,
      name: 'Rajan',
      active: true,
      homeCode: 'VLR'
    }
  ];

  return employees;
};
