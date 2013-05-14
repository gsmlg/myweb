define(['backbone','modules/models/listItem'], function(Backbone,ListItem){
    var ListCollection = Backbone.Collection.extend({
	model: ListItem
    })
    return ListCollection;
})
