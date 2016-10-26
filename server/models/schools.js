var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchoolSchema = new mongoose.Schema({
	name: {type: String},
	api_name: {type: String},
}, { timestamps: {} })
	
mongoose.model('School', SchoolSchema);
var School = mongoose.model('School');