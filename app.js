/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
    , settings = require('./settings')
    , MongoStore = require('connect-mongo')(express)
    , mongoose = require('mongoose');

// var mongooseAuth = require('mongoose-auth');

var app = express();
mongoose.connect('mongodb://localhost');
// mongoStore = new MongoStore({'url' : 'mongodb://localhost:27017/test'});

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
app.use(express.session({
        key: 'NODESSID',
        secret:settings.cookie_secure_key,
        store: new MongoStore({
          'db': 'test'
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
app.use(express.compress());

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
