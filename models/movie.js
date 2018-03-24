var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    phase:{ type: Number, min: 1, max: 9, required:true  },
    title:{ type:String, required:true },                  
    thumbnail:{ type:String, required:true },              
    date:{ type:Date, required:true },                     
    cast:{ type:String, required:true },                   
    director:{ type:String, required:true },               
    writers:{ type:String, required:true },                
    synopsis:{ type:String, required:true },               
    rating:{ type:String, required:true },     
    trailer:{ type:String },                 
    boxoffice:{ type:Number, min: 0, required:true }
});

const Movie = module.exports = mongoose.model('Movie',movieSchema);

module.exports.getMovies = (callback, limit) => {
	Movie.find(callback).limit(limit);
}

module.exports.addMovie = (movie, callback) => {
	Movie.create(movie, callback);
}

module.exports.removeMovie = (id, callback) => {
	var query = {_id: id};
	Movie.remove(query, callback);
}
