require("dotenv").config();
var request = require("request");
var Spotify = require("node-spotify-api");
var keys = require("./key.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var moment = require("moment");

var action = process.argv[2];
var input = process.argv.slice(3).join(" ");
var output;
var separator = 
"--------------------------------------";



function concertThis(input) {
    var artist = input;
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(URL, function (error, response, body) {
        if (error) {
            return console.log(error);
        }       
        else if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            for (var i = 0; i < data.length; i++) {
                var venue = data[i].venue;
                var name = "Venue: " + venue.name + "\n";
                var location = "Venue Location: " + venue.city + ", " + venue.region + ", " + venue.country + "\n";
              
                var date = "Date of Event: " + moment(data[i].datetime).format("MM/DD/YYYY") + "\n";
                output = name + location + date + separator;
                // Logs the output data into log.txt
                log();
                console.log(output);
            }
        }
    });
};


function spotifyThis(input) {

         input = "The Song";
    
    spotify.search({ type: "track", query: input, limit: 15 }, function (err, data) {
        if (err) {
            return console.log("Error occurred" + err);
        } else {
            var songInfo = data.tracks.items;
            for (var i = 0; i < songInfo.length; i++) {
                var artist = "Artist: " + songInfo[i].artists[0].name + "\n";
                var songTitle = "Song Title: " + songInfo[i].name + "\n";
                var previewURL;
             
                if(songInfo[i].preview_url !== null){
                    previewURL = "Preview URL: " + songInfo[i].preview_url + "\n";
                }
                else{
                    previewURL = "Preview URL not available" + "\n";
                }
                var album = "Album Title: " + songInfo[i].album.name + "\n";
                output = artist + songTitle + previewURL + album + separator;
                // Logs the output data into log.txt
                log();                
                console.log(output);
        }
    }

    })
};

function movieThis(input) {
    var movieName = "Mr. Nobody";
    var URL = "http://www.omdbapi.com/?type=movie&t=" + movieName + "&apikey=trilogy";

    request(URL, function (error, response, body) {
        if (error) {
            return console.log(error);
        }
        else if (!error && response.statusCode === 200) {
           
            var movie = JSON.parse(body);
            var title = "Title: " + movie.Title + "\n";
            var year = "Year: " + movie.Year + "\n";
            var imdbRating = "IMDB Rating: " + movie.imdbRating + "\n";
            var rtRating = "Rotten Tomatoes Rating: " + movie.Ratings[1].Value + "\n";
            var country = "Country: " + movie.Country + "\n";
            var language = "Language: " + movie.Language + "\n";
            var plot = "Plot: " + movie.Plot + "\n";
            var actors = "Actors: " + movie.Actors;
            output = title + year + imdbRating + rtRating + country + language + plot + actors;
            // Logs the output data into log.txt
            log();          
            console.log(output);
        }
    })
};

function doWhatItSay() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            return console.log(error);
        }
        else{
            var dataArray = data.split(",");
            logtoText(dataArray[0], dataArray[1]);
            console.log("Do this: " + dataArray[0] + ", " + dataArray[1] + "\n");    
            switchStatement(dataArray[0], dataArray[1]);
        }
    })

};

function log() {   
    fs.appendFile("log.txt", output + "\n", function (error) {
        if (error) {
            return console.log(error);
        }
    })
};

function logtoText(action, input){
   
    fs.appendFile("log.txt", "\n" + action + ", " + input + "\n" + separator + "\n", function(error){
        if(error){
            return console.log(error);
        }
    })
}

function switchStatement(action, input) {
    switch (action) {
        case "concert-this":
            concertThis(input);
            break;
        case "spotify-this":
            spotifyThis(input);
            break;
        case "movie-this":
            movieThis(input);
            break;
        case "do-what-it-say":
            doWhatItSay(input);
            break;
        default:
            console.log("Please enter a correct command!");
            break;
    }
};
switchStatement(action, input);
logtoText(action, input);


