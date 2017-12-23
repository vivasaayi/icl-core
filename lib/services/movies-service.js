var MoviesService = function(){
	
};

MoviesService.prototype.getMoviesForIndexPage = function(callback){
	var movies = [
		{
			caption: "Sathaay Nishkalamaai",
			type: "youtube",
			objectId: "NfS8oaKwULE"
		},
		{
			caption: "Sathaay Nishkalamaai",
			type: "youtube",
			objectId: "-lOWb6lm-5E"
		},
		{
			caption: "Sathaay Nishkalamaai",
			type: "youtube",
			objectId: "HYd_atQ7rBs"	
		}
	];	
	
	return Promise.resolve(movies);
};

module.exports = new MoviesService();