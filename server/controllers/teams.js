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
					}
				}
		}
						}
})() //immediately invoked