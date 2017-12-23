var schemaRepository = require("../repositories/schema-repository");
var userDataRepository = require("../repositories/user-data-repository");

module.exports.getSchema = function (req, res) {
  var schemaName = req.params.id;
  
  schemaRepository.getSchema(schemaName, function (err, doc) {
    if (err) {
      res.send({result: "failed"});
    }
    else if(!doc || doc.length === 0){
      res.send({result: "No Documents Found"});
    }
    else {
      var collectionName = String(schemaName).split("-");
      userDataRepository.loadAll(collectionName[0], function(err, result){
        if(err){
          res.send({result: "failed"});
        }
        else{
          doc.data = result;
          res.send(doc);
        }
      });
    }
  });
};