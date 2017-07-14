var keys = require('./keys.js')



var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var getTweets = function(){
	var client = new Twitter(keys.twitterKeys);
	var params = {screen_name: 'nodejs'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	  }
	  console.log(tweets)
	});
}

 var getSpotify = function(){ 
 	var spotifyKey = keys.spotifyKeys.key;
    var spotifySec = keys.spotifyKeys.secret;
    console.log(spotifyKey);
    console.log(spotifySec);
	
	var spotify = new Spotify({
	  id: spotifyKey,
	  secret: spotifySec
	}); 

	spotify.search({ type: 'track', query: constructSongTitle() }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }	 
	
	for( var i=0; data.tracks.items.length >i; i++){
                  
      songInfo = data.tracks.items[i];
      console.log("\n------------------------------------------------------------------------------");
      console.log("\nArtist(s) : "+songInfo.artists[0].name);
       console.log("\nThe song’s name : "+ songInfo.name);

         if(songInfo.preview_url === null) {
             console.log("\nA preview link of the song not avaiable" );
         }
         else {
             console.log("\nA preview link of the song : "+ songInfo.preview_url);
         }

         console.log("\nThe album name :"+songInfo.album.name);

         console.log("\n------------------------------------------------------------------------------");

  }
	});



};



function constructSongTitle(){
    var title= " ";
    for( var i=3; process.argv.length >i; i++){
        title += process.argv[i]+" ";
    }

    //console.log(‘song name -->‘+title.trim());

    return title.trim();
};




var getInput = function(commandInput) {

	switch(commandInput) {
	    case 'my-tweets':
	        console.log("these are my tweets!")
	        getTweets()
	        break;
	    case 'spotify-this-song':
	    	 console.log("these are my songs!")
	    	 getSpotify()
	        break;
	    case 'movie-this':
	        console.log("fave movies!")
	        break;
	    case 'do-what-it-says':
	        console.log("ok!")
	        break;
	    default:
	        console.log('Please issue another command')
	}

};

getInput(process.argv[2])

