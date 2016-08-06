var crypto = require('crypto');
var mongoose = require('mongoose'),
	User = mongoose.model('User');

function hashPW(pwd){
	return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

exports.signup = function(req, res){
	var user = new User({username:req.body.username});
	console.log('~~~IM HERE~~~')
	user.set('hashed_password', hashPW(req.body.password));
	user.set('email', req.body.email);
	user.save(function(err) {
		if (err){
			//res.sessor.error = err
			res.session.error = err;
			res.redirect('/signup');
		} else {
			req.session.user = user.id;
			req.session.username = user.username;
			req.session.msg = 'Authenticated as ' + user.username;
			console.log(user)
			// res.redirect('/');
			res.json(user)
		}
	});
};

exports.login = function(req, res) {
	// console.log(req.body.username)
	User.findOne({ username: req.body.username }).exec(function(err, user){
		if (!user) {
			err = 'User not Found.';
		} else if (user.hashed_password === hashPW(req.body.password.toString())) {
			req.session.regenerate(function(){
				req.session.user = user.id;
				req.session.username = user.username;
				req.session.msg = 'Authenticated as ' + user.username;
				console.log('LOGGED IN')
				res.redirect('/');
				// res.end()
			});
		} else {
			err = 'Authentication Failed.';
		}
		if (err) {
			req.session.regenerate(function(){
				req.session.msg = err;
				res.redirect('/login');
			});
		}
	});
};

exports.getUserProfile = function(req, res){
	User.findOne({_id: req.session.user}).exec(function(err, user){
		if(!user){
			res.json(404, {err: 'User Not Found'});
		} else {
			res.json(user);
		}
	});
};

exports.updateUser = function(req, res){
	User.findOne({_id: req.session.user}).exec(function(err, user){
		user.set('email', req.body.email);
		user.save(function(err){
			if (err){
				//res.sessor.error = err
				res.session.error = err;
			} else {
				req.session.msg = 'User Updated.';
			}
			res.redirect('/user')
		});
	});
};

exports.deleteUser = function(req, res){
	User.findOne({_id: req.session.user}).exec(function(err, user){
		if(user){
			user.remove(function(err){
				if(err){
					req.session.msg = err;
				}
				req.session.destroy(function(){
					res.redirect('/login');
				});
			});
		} else {
			req.session.msg = 'User Not Found!';
			req.session.destroy(function(){
				res.redirect('/login');
			});
		}
	});
};