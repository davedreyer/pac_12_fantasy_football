var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new mongoose.Schema({
	name: {type: String},
	_players: [{type: Schema.Types.ObjectId, ref: 'Player'}],
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
	_league: {type: Schema.Types.ObjectId, ref: 'League'},
}, { timestamps: {} })
	
mongoose.model('Team', TeamSchema);
var Team = mongoose.model('Team');