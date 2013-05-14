/**
 * Created with JetBrains WebStorm.
 * User: Gao
 * Date: 13-5-13
 * Time: 下午11:57
 * To change this template use File | Settings | File Templates.
 */
define(['backbone','jquery','lodash','text!templates/content.html',
	'modules/collections/content'],function(Backbone,$,_,tmpl,listData){
    var ContentView = Backbone.View.extend({
	'el':false,
	'serialize': function(){
	    return this.collection.toJSON();
	},
	'template': _.template(tmpl),
	'initialize': function(){
	    this.collection = new listData;
	    return this;
	},
	render: function(template,context){
	    return template(context);
	}
    });
    return ContentView;
})
