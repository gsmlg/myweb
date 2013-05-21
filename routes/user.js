
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.registry = function(req, res){
    console.log(req);
    
    res.send('ok');
    

}
