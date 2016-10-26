var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeagueSchema = new mongoose.Schema({
	name: {type: String},
	_users: [{type: Schema.Types.ObjectId, ref: 'User'}],
	_teams: [{type: Schema.Types.ObjectId, ref: 'Team'}],
}, { timestamps: {} })
	
mongoose.model('League', LeagueSchema);
var League = mongoose.model('League');