/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
    , settings = require('./settings')
    , mongoose = require('mongoose')
    , gzippo = require('gzippo');

// var mongooseAuth = require('mongoose-auth');

var app = express();
mongoose.connect('mongodb://localhost');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// set sessions control system
app.use(express.cookieParser( settings.cookie_secure_key ));
app.use(express.cookieSession({
    secret: settings.cookie_secure_key,
    cookie: { maxAge: 2628000000 },
    store: new (require('express-sessions'))({
        storage: 'mongodb',
        instance: mongoose, // optional
        host: 'localhost', // optional
        port: 27017, // optional
        db: 'users', // optional
        collection: 'sessions', // optional
        expire: 86400 // optional
    })
}));

// set routing system
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
routes(app);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// config = require('./config')(app, express, gzippo, mongoose)

// gzip text files
app.use(gzippo.staticGzip(__dirname + '/public'));
app.use(gzippo.compress());

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
