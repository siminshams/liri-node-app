# liri-node-app
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

1) node liri.js concert-this <artist/band name here>

   This will search the Bands in Town Artist Events. This will output the following information to your terminal/bash window:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")
     
     ![concert-this screenshot](../master/images/concert-this.png)

2) node liri.js spotify-this-song '<song name here>'

   This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.

3)node liri.js movie-this '<movie name here>'

   This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```
      ![movie-this screenshot](../master/images/movie-this.png)

4)node liri.js do-what-it-says

This uses the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.