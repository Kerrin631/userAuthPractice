var crypto = require('crypto');
var mongoose = require('mongoose'),
	User = mongoose.model('User');
var passport = require('passport');
var jwt = require('express-jwt');
var secret = 'secret';
var auth = jwt({secret: secret, userProperty: 'payload'});
// function hashPW(pwd){
// 	return crypto.createHash('sha256').update(pwd).digest('base64').toString();
// }

module.exports = {
	Register: function(req, res, next){
		if(!req.body.username || !req.body.password){
			return res.status(400).json({message: 'Please fill out all fields'});
		}
		User.findOne({username: req.body.username}, function(err, user){
			console.log('searching...')
			if(err){
				// console.log(err)
				return res.json({error: 'This username already exists.'})
			} else {
				var user = new User();
				console.log(req.body.email)
				user.username = req.body.username;
				user.setPassword(req.body.password);
				user.email = (req.body.email);
				user.save(function (err){
					if(err){ 
						console.log(err)
						return next(err);
					}
				return res.json({token: user.generateJWT()})
				})
			}
		})
	},

	logIn: function(req, res, next){
		console.log(req.body)
	    if(!req.body.username || !req.body.password){
	      return res.status(400).json({message: 'Please fill out all fields'});
	    }

		passport.authenticate('local', function(err, user, info){
			if(err){ return next(err); }

			if(user){
				return res.json({token: user.generateJWT()});
			} else {
				return res.status(401).json(info);
			}
		})(req, res, next);
	},

	userUpdate: function(req, res, next){
		console.log(req.body)
		User.findOne({username: req.body.username}, function(err, user){
			user.email = req.body.updatedEmail;
			user.username = req.body.updatedUsername
			user.save(function(err){
				if(err){
					return next(err);
				}
		 	})
		 	return res.json({token: user.generateJWT()})
		})
	},

	deleteUser: function(req, res, nexr){
		console.log(req.body)
		User.remove({username: req.body.username}, function(err, results){
			if(err){
				console.log('error')
				return next(err);
			}
			console.log('hello')
			res.end()
		})
	}
}


// exports.signup = function(req, res){
// 	var user = new User({username:req.body.username});
// 	console.log('~~~IM HERE~~~')
// 	user.set('hashed_password', hashPW(req.body.password));
// 	user.set('email', req.body.email);
// 	user.save(function(err) {
// 		if (err){
// 			//res.sessor.error = err
// 			res.session.error = err;
// 			res.redirect('/signup');
// 		} else {
// 			req.session.user = user.id;
// 			req.session.username = user.username;
// 			req.session.msg = 'Authenticated as ' + user.username;
// 			console.log(user)
// 			// res.redirect('/');
// 			res.json(user)
// 		}
// 	});
// };

// exports.login = function(req, res) {
// 	// console.log(req.body.username)
// 	User.findOne({ username: req.body.username }).exec(function(err, user){
// 		if (!user) {
// 			err = 'User not Found.';
// 		} else if (user.hashed_password === hashPW(req.body.password.toString())) {
// 			req.session.regenerate(function(){
// 				req.session.user = user.id;
// 				req.session.username = user.username;
// 				req.session.msg = 'Authenticated as ' + user.username;
// 				console.log('LOGGED IN')
// 				res.redirect('/');
// 				// res.end()
// 			});
// 		} else {
// 			err = 'Authentication Failed.';
// 		}
// 		if (err) {
// 			req.session.regenerate(function(){
// 				req.session.msg = err;
// 				res.redirect('/login');
// 			});
// 		}
// 	});
// };

// exports.getUserProfile = function(req, res){
// 	User.findOne({_id: req.session.user}).exec(function(err, user){
// 		if(!user){
// 			res.json(404, {err: 'User Not Found'});
// 		} else {
// 			res.json(user);
// 		}
// 	});
// };

// exports.updateUser = function(req, res){
// 	User.findOne({_id: req.session.user}).exec(function(err, user){
// 		user.set('email', req.body.email);
// 		user.save(function(err){
// 			if (err){
// 				//res.sessor.error = err
// 				res.session.error = err;
// 			} else {
// 				req.session.msg = 'User Updated.';
// 			}
// 			res.redirect('/user')
// 		});
// 	});
// };

// exports.deleteUser = function(req, res){
// 	User.findOne({_id: req.session.user}).exec(function(err, user){
// 		if(user){
// 			user.remove(function(err){
// 				if(err){
// 					req.session.msg = err;
// 				}
// 				req.session.destroy(function(){
// 					res.redirect('/login');
// 				});
// 			});
// 		} else {
// 			req.session.msg = 'User Not Found!';
// 			req.session.destroy(function(){
// 				res.redirect('/login');
// 			});
// 		}
// 	});
// };

