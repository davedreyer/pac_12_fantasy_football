var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new mongoose.Schema({
	school_name: {type: String},
	status: {type: String},
	name_last: {type: String},
	name_first: {type: String},
	name_abbr: {type: String},
	weight: {type: String, default: "Unknown"},
	name_full: {type: String},
	experience: {type: String},
	height: {type: String},
	birth_place: {type: String},
	position: {type: String},
	player_id: {type: String},
	jersey_number: {type: String, default: "Unknown"},
	_school: {type: Schema.Types.ObjectId, ref: "School"}
}, { timestamps: {} })
	
mongoose.model('Player', PlayerSchema);
var Player = mongoose.model('Player');