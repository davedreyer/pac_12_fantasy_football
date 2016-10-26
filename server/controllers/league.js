var mongoose=require('mongoose')
var League= mongoose.model('League')

module.exports=(function(){
	return{
		new:function(req,res){
			League.create({name:req.body.name}, function(err,createdLeague){
				if(err){
					res.json({errors:err})
				}else{	
					League.findOne({_id:createdLeague._id}, function(err,returnedLeague){
						if(err){
							console.log(err)
						}else{
							returnedLeague._users.push(req.body.user)
							returnedLeague.save(function(err,savedLeague){
								if(err){
									console.log(err)
								}else{
									res.json(savedLeague)
								}
								
							})
						}
					})
					
				}
			})
		},
		getLeagues:function(req,res){
			League.find({},function(err,returnedLeagues){
				if(err){
					console.log(err)
				}else{
					res.json(returnedLeagues)
				}
			})
		}

					}
})() //immediately invoked