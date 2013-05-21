
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.current = function(req, res){
    res.send({email: 'google@user'})
}

exports.registry = function(req, res){
    res.send('success')
}