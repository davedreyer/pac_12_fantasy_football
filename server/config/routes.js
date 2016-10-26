var path = require('path')
var users = require('./../controllers/users.js');
var pac12 = require('./../controllers/pac12.js');
var request = require('request');
var mongoose = require('mongoose');
var Player = mongoose.model('Player');
var School = mongoose.model('School');
var league= require('./../controllers/league.js')


module.exports = function (app) {
	app.post('/registration', function(req, res){
		users.registration(req, res)
	});
	app.post('/login', function(req, res){
		users.login(req, res)
	});
	app.get('/checkUser', function(req, res){
		users.checkUser(req, res)
	});
	app.get('/logout', function(req, res){
		users.logout(req, res)
	});
	app.post('/newLeague', league.new)
	app.get('/leagues', league.getLeagues)







































	
	app.get('/roster/create', function(req, res) {

		// ['WAS','ARI','ASU','COL','ORS','UCLA','USC','CAL','ORE','WST','UTH','STA']

		// var schools = ['STA'];

	 	for ( var x = 0; x < schools.length; x++ ) {

		api_url = 'http://api.sportradar.us/ncaafb-t1/teams/' + schools[x] + '/roster.json?api_key=krx53vewwkqe84rybsddvqn7';

		request(api_url, function (err, response) {
			if (err) {
			} else {
			
				console.log(response.body);
				var obj = JSON.parse(response.body);
				var players = obj.players;
				var school = obj.id;
				for ( y = 0; y < players.length; y++ ) {
				var player = new Player({
					school_name: school,
					player_id: players[y]['id'], 
					status: players[y]['status'],
					name_last: players[y]['name_last'],
					name_first: players[y]['name_first'],
					name_abbr: players[y]['name_abbr'],
					weight: players[y]['weight'],
					name_full: players[y]['name_full'],
					experience: players[y]['experience'],
					height: players[y]['height'],
					birth_place: players[y]['birth_place'],
					position: players[y]['position'],
					jersey_number: players[y]['jersey_number']
				});
				if (!player) {
					console.log("Error with player!");
				}
				else {
					player.save(function (err, savedPlayer) {
						if (err) {	
							console.log (err);
						}
					})
				}	
				}
			}	
		})
		}
	})	
}	