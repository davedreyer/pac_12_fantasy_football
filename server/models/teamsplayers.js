var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamPlayerSchema = new mongoose.Schema({
	_player: {type: Schema.Types.ObjectId, ref: 'Player'},
	_player_id: {type: String},
	_team: {type: Schema.Types.ObjectId, ref: 'Team'},
	_league: {type: Schema.Types.ObjectId, ref: 'League'},
}, { timestamps: {} })
	
mongoose.model('TeamPlayer', TeamPlayerSchema);
var TeamPlayer = mongoose.model('TeamPlayer');