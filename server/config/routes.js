var path = require('path')
var users = require('./../controllers/users.js');
var pac12 = require('./../controllers/pac12.js');
var request = require('request');
var mongoose = require('mongoose');
var Player = mongoose.model('Player');
var School = mongoose.model('School');
var Game = mongoose.model('Game');
var Stat = mongoose.model('Stat');
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
	app.get('/roster/show_all', function(req, res){
		pac12.show_all(req, res)
	});
	app.post('/newLeague', league.new)
	app.get('/leagues', league.getLeagues)
	app.get('/myleague', league.getMyLeague)
	app.put('/joinLeague', league.joinLeague)
	app.get('/stats/new', function (req, res) {
		// Player.find({}, function (err,players) {
			api_url = 'http://api.sportradar.us/ncaafb-t1/teams/WAS/2016/REG/statistics.json?api_key=krx53vewwkqe84rybsddvqn7';
			request(api_url, function (err, response) {
			if (err) {
			} else {
			var obj = JSON.parse(response.body);
			// console.log(obj);
			// console.log(obj['players']);
			// console.log(obj['players'][0]['statistics']);
			// console.log(obj['players'][obj['players'].length - 18]['statistics']);
			 // console.log(obj['players'][obj['players'].length - 3]['statistics']);
			

			for (let x = 0; x < obj['players'].length; x++ ) {
				
				if ( obj['players'][x]['statistics'] ) {
					
					if (obj['players'][x]['position'] == 'QB' ) {
						
						Stat.findOne({player_id: obj['players'][x]['id']}, function (err, stat) {
							if (err) {	
								console.log(err);
							} else {
								if (stat) {

									stat.touchdowns = obj['players'][x]['statistics']['rushing']['td'] +
													  obj['players'][x]['statistics']['passing']['td']
									stat.save(function (err, savedStat) {
										if (err) {
											console.log(err);
										}
										else {
											console.log(savedStat);
											console.log(x);
										}
									})				  	
								}
								else {
									Stat.create(
									{	player_id: obj['players'][x]['id'],
										touchdowns: 
										obj['players'][x]['statistics']['rushing']['td'] +
										obj['players'][x]['statistics']['passing']['td']
									}, function (err, stat) {
										if (err) {
											console.log(err);
										}
										else {
											console.log(stat);
											console.log(x);
										}
									})
								}
							}
						})						
					}
					else if (obj['players'][x]['position'] == 'WR' ||
							 obj['players'][x]['position'] == 'RB')   {

							Stat.findOne({player_id: obj['players'][x]['id']}, function (err, stat) {
							if (err) {
								console.log(err);
							} else {

								if (stat) {	

									var recTDs = 0;
									var rushTDs = 0;

									if (obj['players'][x]['statistics']['receiving']) {
										recTDs = obj['players'][x]['statistics']['receiving']['td'];
									}
									if (obj['players'][x]['statistics']['rushing']) {
										rushTDs = obj['players'][x]['statistics']['rushing']['td'];
									}	

									var totalTDs = recTDs + rushTDs;

									stat.touchdowns = totalTDs;

									stat.save(function (err, savedStat) {
										if (err) {
											console.log(err);
										}
										else {
											console.log(savedStat);
											console.log(x);
										}
									})	
								}

								else {

									Stat.create(
										{	player_id: obj['players'][x]['id'],
											touchdowns: 
											totalTDs
										}, function (err,stat) {
											if (err) {
												console.log(err)
											}
											else {
												console.log(stat);
												console.log(x);
											}
										})	
								}			
							}
						})
					}	
				}
			}	
		}	
	})
	})		
		
	

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

	app.get('/games/create', function(req, res) {

		api_url = 'https://api.sportradar.us/ncaafb-t1/2016/REG/schedule.json?api_key=krx53vewwkqe84rybsddvqn7';
		var games = [];

		request(api_url, function (err, response) {
			if (err) {
			} else {
			
				console.log(response.body);
				var obj = JSON.parse(response.body);
				var weeks = obj['weeks'];
				for ( x = 0; x < weeks.length; x++ ) {
					for ( y = 0; y < weeks[x]['games'].length; y++ ) {
						if ( weeks[x]['games'][y]['home'] === 'WAS' ||           
							 weeks[x]['games'][y]['home'] === 'ARI' ||
							 weeks[x]['games'][y]['home'] === 'ASU' ||
							 weeks[x]['games'][y]['home'] === 'COL' ||
							 weeks[x]['games'][y]['home'] === 'ORS' ||
							 weeks[x]['games'][y]['home'] === 'UCLA' ||
							 weeks[x]['games'][y]['home'] === 'USC' ||
							 weeks[x]['games'][y]['home'] === 'CAL' ||
							 weeks[x]['games'][y]['home'] === 'ORE' ||
							 weeks[x]['games'][y]['home'] === 'WST' ||
							 weeks[x]['games'][y]['home'] === 'UTH' ||
							 weeks[x]['games'][y]['home'] === 'STA' ) {
								weeks[x]['games'][y]['week'] = x + 1;
								games.push( weeks[x]['games'][y] ); 
						}
						else if
							( weeks[x]['games'][y]['away'] === 'WAS' ||           
							  weeks[x]['games'][y]['away'] === 'ARI' ||
							  weeks[x]['games'][y]['away'] === 'ASU' ||
							  weeks[x]['games'][y]['away'] === 'COL' ||
							  weeks[x]['games'][y]['away'] === 'ORS' ||
							  weeks[x]['games'][y]['away'] === 'UCLA' ||
							  weeks[x]['games'][y]['away'] === 'USC' ||
							  weeks[x]['games'][y]['away'] === 'CAL' ||
							  weeks[x]['games'][y]['away'] === 'ORE' ||
							  weeks[x]['games'][y]['away'] === 'WST' ||
							  weeks[x]['games'][y]['away'] === 'UTH' ||
							  weeks[x]['games'][y]['away'] === 'STA' ) {
							  	weeks[x]['games'][y]['week'] = x + 1;
								games.push( weeks[x]['games'][y] ); 
						}
					}
				}
				console.log(games);	
				for ( z = 0; z < games.length; z++ ) {
				var game = new Game({
					game_id: games[z]['id'],
					scheduled: games[z]['scheduled'], 
					home_team: games[z]['home'],
					away_team: games[z]['away'],
					venue: games[z]['venue']['name'],
					week: games[z]['week']
				});
				if (!game) {
					console.log("Error with game!");
				}
				else {
					game.save(function (err, savedGame) {
						if (err) {	
							console.log (err);
						}
					})
				}	
				}

			}
			console.log("Finished downloading games!");	
		})	
		})		
}	