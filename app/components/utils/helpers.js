// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// New York Times API
var API = "cb08732c00c3467e8066fb80a328aeda";

// Helper Functions
var helpers = {

	runQuery: function(topic, startYear, endYear){

		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + API + "&q=" + topic + "&begin_date=" + start + "0101&end_date=" + end + "0101";

		return axios.get(queryURL)
			.then(function(response){

				var count = 0;
				var returnResults = [];
				var allResults = response.data.response.docs;

				//Returns first 5 articles
				for(var i = 0; i < allResults.length; i++){

					if(count > 4) {
						return returnResults;
					}

					if(allResults[count].headline.main &&
					 allResults[count].pub_date &&
					 allResults[count].web_url) {
						returnResults.push(allResults[count]);
						count++;
					}
				}

				return returnResults;
		})

	},


	// Saves articles for database
	postArticle: function(title, date, url){

		axios.post('/api/saved', {title: title, date: date, url: url})
		.then(function(results){

			console.log("Posted to Mongo!");
			return(results);
		})
	}

}

module.exports = helpers;