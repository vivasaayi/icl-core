var Recaptcha = require('recaptcha').Recaptcha;
var config = require("../config").captcha;

var CaptchaService = function (){	
};

CaptchaService.prototype.verifyCaptcha = function (data, callback){
  callback("hello");
  //var recaptcha = new Recaptcha(config.publicKey, config.privateKey, data);
  //recaptcha.verify(callback);
};

CaptchaService.prototype.getCaptchaForm = function(){
  var recaptcha = new Recaptcha(config.publicKey, config.privateKey);
  return recaptcha.toHTML();
};

module.exports = CaptchaService;