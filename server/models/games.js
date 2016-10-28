var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new mongoose.Schema({
	game_id: {type: String, required: true},
	scheduled: {type: String},
	home_team: {type: String, required: true},
	away_team: {type: String, required: true},
	venue: {type: String},
	week: {type: Number, required: true},
}, { timestamps: {} })
	
mongoose.model('Game', GameSchema);
var Game = mongoose.model('Game');