var database = require("dal");

module.exports.getSchema = function(schemaName, callback){
  database.findOne("schema", {name: schemaName}, function(err, result){
    callback(err, result);
  });
};
