var express = require('express');
var app = express();
var bp = require('body-parser');
var path = require('path');
var session = require('express-session');
var request = require('request');

app.set('trust proxy', 1) 
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(8000, function() {
	console.log("listening on port 8000");
})