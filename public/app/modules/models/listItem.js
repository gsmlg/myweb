define(['backbone'], function(Backbone){
    var ListItem = Backbone.Model.extend({
	'default':{
	    'name':''
	}
    })
    return ListItem;
})
