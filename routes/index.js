
/*
 * GET home page.
 */

user = require('./user');

module.exports = function(app) {
    /*
    app.get('/', function(req, res){
        res.render('index.jade', {'title': 'Express js'})
    })
    */

    //  set user route
    user(app);
};