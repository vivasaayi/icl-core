var moment = require("moment");

module.exports.getTodaysDateObject = function (){
	return new Date(new Date().toDateString());
};

module.exports.getDateObject = function (dateString){
	return new Date(new Date(dateString).toDateString());
};