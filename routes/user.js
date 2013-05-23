/*
 * set mongoose user schema
 */
var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/');

// ListCollection = mongoose.connection.collection('list');

var userSchema = mongoose.Schema({
    'email': String,
    'password': String
});



var UserModel = mongoose.model('user', userSchema);

/*
 * Set user route
 */

module.exports = function(app) {
    // app.all('/user', checkNotLogin);

    app.get('/user', function(req, res) {
        if (req.session && req.session.user) {
            res.json(200, {email: req.session.user.email })
        } else {
            res.json(403,{'message': 'neet to login!', 'status': 0});
        }
    });

    app.all('/user/registry', checkLogin);

    app.post('/user/registry', function(req, res) {
        if (! req.body.email || !req.body.passwd || !req.body['passwd-repeat']) {
            res.json(200, {message: '', status: 0});
            // return;
        }
        if ( req.body.passwd !== req.body['passwd-repeat']) {
            res.json(200, {'message': 'password diff', 'status': 0});
            // return;
        }
        var email = req.body.email, passwd = req.body.passwd;

        UserModel.findOne({'email': email}, function(err, user) {
            if (user) {
                res.json(200, {'message': 'user exists', 'status': 0});
            } else {
                (new UserModel({'email': email, 'password': passwd})).save(function(err, user) {
                    if (err) res.json(200, {'message': 'connection error', 'status': 0});
                    res.json(200, {'message': '注册成功！', 'status': 1});
                })
            }
        })

    });

    app.all('/user/login', checkLogin);
    app.post('/user/login', function(req, res) {
        if (! req.body.email || !req.body.passwd ) {
            res.json(403, {message: 'go back', status: 0});
            // return;
        }
        var email = req.body.email, passwd = req.body.passwd;
        UserModel.findOne({email: email, password: passwd}, function(err, user) {
            // console.log(user);
            if (err){
                res.json(500,{'message': 'db error',status: 0});
                // return;
            }
            if (user) {
                req.session = {user: user};
                res.json(200,{'message': '登录成功啦！', status: 1})
            }
                
        })
    });

    function checkNotLogin(req, res, next) {
        if (req.session && req.session.user) {
            console.log(req.session.user);
            next();
        }
        res.json(403,{'message': 'neet to login!', 'status': 0});
    }

    function checkLogin(req, res, next) {
        if (req.session.user) {
            res.json(200, {'message': '已经登录了！', 'status': 2})
        }
        next();
    }
}