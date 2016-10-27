var mongoose = require('mongoose');
var Player = mongoose.model('Player');

module.exports = ( function () {

	return {

		show_all: function (req, res) {
			Player.find({}, function(err, returnedRoster) {
				if (err) {
				} else {
					var finalRoster = [];
					for ( var x = 0; x < returnedRoster.length; x++ ) {
						if ( returnedRoster[x]['position'] === 'QB' || 
							returnedRoster[x]['position'] === 'WR' || 
							returnedRoster[x]['position'] === 'RB' ) {
							finalRoster.push(returnedRoster[x]);
						}
					}
					res.json(finalRoster);
				}
			});
		}
	}
})();
