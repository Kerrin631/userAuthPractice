var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var mongoose = require('mongoose');
var path = require('path');
var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + "/client/partials")
app.set('view engine', 'html')
app.use(bodyParser.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "./client")));

// This goes in our server.js file so that we actually use the mongoose config file!
require('./server/config/mongoose.js');

app.use(expressSession({
	secret: 'Secret',
	cookie: {maxAge: 60*60*1000},
	store: new mongoStore({
		mongooseConnection: mongoose.connection,
		collection: 'sessions'
	})
}));

// app.use(express.static(path.join(__dirname, "./client")));

//always require routes AFTER requiring mongoose
require('./server/config/routes.js')(app);

app.listen(8000, function() {
 console.log("listening on port 8000");
})

