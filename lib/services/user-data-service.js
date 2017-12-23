var userDataRepository = require("../repositories/user-data-repository");
var _ = require("underscore");
var _s = require("underscore.string");
var schemas = require("../schema/schemas");
var ObjectId = require("mongodb").ObjectID;

var promisesProcessor = require("./processors/promises");

var processors = {
  promises: promisesProcessor
};

module.exports.new = function(req, res) {
  var employees = userDataRepository.new(req, res);
  res.send(employees);
};

module.exports.load = function(req, res) {

  console.log("Loading");

  if (req.params.term === "new") {
    var schema = schemas[req.params.schema];    
    return res.send(schema);
  }

  userDataRepository.loadById(req.params.schema, req.params.term, function(err, resoponse) {
    if (err) {
    } else {
      res.send(resoponse);
    }
  });
};

module.exports.loadBySimpleQuery = function(schema, fieldName, value, callback) {
  userDataRepository.loadBySimpleQuery(schema, fieldName, value, function(err, response) {
    callback(err, response);
  });
};

module.exports.loadSummary = function(req, res) {
  var summarySchema = schemas[req.params.schema + "-summary"];

  console.log(summarySchema);
  
  userDataRepository.loadSummary(req.params.schema, summarySchema, function(err, resoponse) {
    if (err) {
    } else {
      res.send(resoponse);
    }
  });
};

module.exports.searchLyrics = function(req, res){
  var summarySchema = schemas["lyrics-summary"];

  userDataRepository.loadSummary("lyrics", summarySchema, function(err, response) {
    if (err) {
      console.log("Error searching for: " + req.params.term)
      console.dir(err);
    } else {
      var result = [];
      _.each(response, function(item){
        if(_s.startsWith(item.name, req.params.term)){
          result.push(item);
        }
      });

      res.send({result: result});
    }
  });
};

module.exports.loadAll = function(req, res) {
  userDataRepository.loadAll(function(err, resoponse) {
    if (err) {
    } else {
      res.send(resoponse);
    }
  });
};

module.exports.save = function(req, res) {
  var documentToSave = {
  };

  documentToSave = _.extend(documentToSave, req.body);
  
  if(processors[documentToSave.__name__]){
    processors[documentToSave.__name__].processSave(documentToSave);
  }

  userDataRepository.save(documentToSave.__name__, documentToSave, function(err, response) {
    if (err) {
      res.status(404).send('Not found');
    } else {
      if (response && response.length) {
        res.send(response);
      } else {
        res.send(documentToSave);
      }      
    }
  });
};

module.exports.remove = function(req, res) {
  var documentToSave = {
  };

  documentToSave = _.extend(documentToSave, req.body);

  userDataRepository.delete(documentToSave.__name__, documentToSave, function(err, resoponse) {
    if (err) {
    } else {
      res.send(resoponse);
    }
  });
};

module.exports.removeFromCollection = function (req, res) {
  var collection = req.params.schema;
  var id = req.params.term;
  
  var documentToSave = {
    _id: id
  };
  
  userDataRepository.delete(collection, documentToSave, function (err, resoponse) {
    if (err) {
    } else {
      res.send({status: "Success"});
    }
  });
};

