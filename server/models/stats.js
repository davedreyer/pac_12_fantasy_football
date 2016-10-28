var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatSchema = new mongoose.Schema({
	player_id: {type: String, required: true},
	touchdowns: {type: Number}
}, { timestamps: {} })
	
mongoose.model('Stat', StatSchema);
var Stat = mongoose.model('Stat');