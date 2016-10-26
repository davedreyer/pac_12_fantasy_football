var mongoose = require('mongoose')
var User = mongoose.model('User')
var bcrypt = require('bcryptjs')

module.exports = (function(){
		return{
			registration: function (req, res){
				User.findOne({email: req.body.email}, function(err, user){
					if(err){
						console.log(err)
					}
					else{
						if (user){
							res.json({errors: "Email already registered in database"})
						}		
						else {
								var user = new User({
								first_name: req.body.first_name,
								last_name: req.body.last_name,
								email: req.body.email,
								pw: bcrypt.hashSync(req.body.pw, bcrypt.genSaltSync(8)),
						})

							user.save(function (err, newuser){
							if (err){
								return res.json({status: false})
							}
							else{
								req.session.user = newuser;
								req.session.save()
								console.log(req.session.user);
								return res.json({status: true, user: newuser})
							}
							})
						}
					}
				})
		
			},

			checkUser: function (req, res){
			if(req.session.user){
				res.json({user: req.session.user})
			}
			else{
				res.json({user: null})
			}
			},				
			
			login: function (req, res){
				
				User.findOne({email: req.body.email}, function(err, user){

					if(err || user == undefined){
        				console.log("ERROR: " + err);
        				res.json({ errors: "No email matching in database"})
        			}
        			else {
		       			if(bcrypt.compareSync(req.body.pw, user.pw)){
					        console.log("Password match!!!!!!!!");
					        req.session.user = user;
						    req.session.save();
							return res.json({status: true, user: user})
		        		}
		        		else{		
		         			 console.log("No match!")
          					 res.json({ errors : "Invalid password" });
		        		}

					}
				})

			},
			logout: function(req, res){
				req.session.destroy()
				res.redirect('/')
			}
		}
	})(); //immediately invoked