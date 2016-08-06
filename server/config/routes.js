var mongoose = require('mongoose');
var users = require('./../controllers/users_controller.js');
var crypto = require('crypto');
var express = require('express');

module.exports = function(app) {
  // verb: get, plural of target as the URI is the RESTful index method (it returns all customers)
	app.use('/static', express.static( './static')).use('/lib', express.static( '../lib'));

	app.get('/', function(req, res){
		if (req.session.user) {
			console.log(req.session.user)
			res.redirect('/home', {username: req.session.username, msg:req.session.msg});
		} else {
			req.session.msg = 'Access denied!';
			res.redirect('/login');
		}
	});
	
	app.get('/user', function(req, res){
		if (req.session.user) {
			res.render('user', {msg:req.session.msg});
		} else {
			req.session.msg = 'Access denied!';
			res.redirect('/login');
		}
	});

	app.get('/signup', function(req, res){
		if(req.session.user){
			res.redirect('/');
		}
		res.render('signup', {msg:req.session.msg});
	});

	app.get('/login',  function(req, res){
		if(req.session.user){
			res.redirect('/');
		}
		res.render('login', {msg:req.session.msg});
	});


	app.get('/logout', function(req, res){
		req.session.destroy(function(){
			res.redirect('/login');
		});
	});

	app.post('/login', function(req, res){
		users.login(req, res)
	});

	app.post('/newUser', function(req, res){
		users.signup(req, res)
	});
};