var mongoose = require('mongoose');
var Schema = mongoose.Schema
var bcrypt = require('bcryptjs')
var UserSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	pw: String,
	_league: {type: Schema.Types.ObjectId, ref: 'League'},
	_team: {type: Schema.Types.ObjectId, ref: 'Team'},
	


})
mongoose.model('User', UserSchema)