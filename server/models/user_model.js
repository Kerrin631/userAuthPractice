var mongoose = require('mongoose');
// Create our User Schema
var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	email: String,
	hashed_password: String
});

mongoose.model('User', UserSchema);
