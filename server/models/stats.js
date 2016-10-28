var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatisticSchema = new mongoose.Schema({
	player_id: {type: String, required: true},
	touchdowns: {type: Number, default: 0}
}, { timestamps: {} })
	
mongoose.model('Statistic', StatisticSchema);
var Statistic = mongoose.model('Statistic');