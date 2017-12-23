var AudioService = function(){
	
};

AudioService.prototype.getTopAudios = function(callback){
	var audios = [
		{
			name: "Sathaay Nishkalamaay",
			objectId: "93723661"
		},
		{
			name: "Karthane em thunaiyaneer",
			objectId: "93723660"
		}
	];
	
	return Promise.resolve(audios);
};

module.exports = new AudioService();