const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const config      	= require("./config");
Movie      			= require('./models/movie');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

mongoose.connect(config.database, function(err){
    if(err)
        console.log("Not connected to db " + err);
    else
        console.log("Successfully connected to database");
});

app.get('/api/movies', (req, res) => {
	Movie.getMovies((err, movies) => {
		if(err){
			throw err;
		}
		res.json(movies);
	});
});

app.post('/api/movies', (req, res) => {
	var movie = req.body;
	//console.log(movie);
	Movie.addMovie(movie, (err, movie) => {
		if(err){
			throw err;
		}
		res.json(movie);
	});
});

// temp delete route
app.get('/api/movies/delete/:_id', (req, res) => {
	var id = req.params._id;
	Movie.removeMovie(id, (err, movie) => {
		if(err){
			throw err;
		}
		res.json(movie);
	});
});

app.listen(config.port,function(){
    console.log("listening on port " + config.port);
});