module.exports = function(app, express, gzippo, mongooseAuth) {
    var config = this;

    //generic config
    app.configure(function(){
        app.set('views', __dirname + '/views');
        app.use(express.bodyParser());
        app.use(express.cookieParser());
        app.use(express.session({ secret: 'topsecret' }));
        app.use(mongooseAuth.middleware());
        app.use(app.router);
        app.use(gzippo.staticGzip(__dirname + '/public'));
        app.use(gzippo.compress());
    });

    mongooseAuth.helpExpress(app);

    return config;
};
