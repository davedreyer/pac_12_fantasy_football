var mongoose=require('mongoose')
var League= mongoose.model('League')
var Player = mongoose.model('Player')
var User = mongoose.model('User')
var Team = mongoose.model('Team')

module.exports=(function(){
	return{
		addTeamToLeague: function(req, res){
			Team.create({
				name:req.body.name,
				_user:req.body._user,
				_league: req.body._league
			}, function(err,createdTeam){
				if(err){
					console.log(err)
				}
				else{
					League.findOne({_id: req.body._league}, function(err, league){
						league._teams.push(createdTeam)
						league.save(function (err, league){
							if (err){
								console.log(err)
							}
							else{
								User.findOne({_id:req.body._user}, function(err,user){
									if(err){
										console.log(err)
									}else{
										user._team=createdTeam
										user.save(function(err,savedUser){
											if(err){
												console.log(err)
											}else{
												res.json(savedUser)
											}
										})
									}
								})
							}
						})
					})
				}
		})
		}
	}
})() //immediately invoked