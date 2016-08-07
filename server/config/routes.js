var mongoose = require('mongoose');
var users = require('./../controllers/users_controller.js');
var crypto = require('crypto');
var express = require('express');
var jwt = require('express-jwt');
var secret = 'secret';
var auth = jwt({secret: secret, userProperty: 'payload'});
var fs = require('fs');

module.exports = function(app) {
  // verb: get, plural of target as the URI is the RESTful index method (it returns all customers)

	app.post('/register', function(req, res, next){
		console.log('ROUTES', req.body)
		users.Register(req, res, next)
	});

	app.post('/login', function(req, res, next){
		console.log('ROUTES', req.body)
		users.logIn(req, res, next)
	});

	app.post('/user/update', function(req, res, next){
		console.log('ROUTES', req.body)
		users.userUpdate(req, res, next)
	});

	app.post('/user/delete', function(req, res, next){
		console.log('ROUTES', req.body)
		users.deleteUser(req, res, next)
	});
};