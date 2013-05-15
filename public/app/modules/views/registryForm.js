define(['jquery','lodash','backbone','text!templates/registry.html'],
       function($, _, Backbone, tmpl){
	   var RegistryView = Backbone.View.extend({
	       template: _.template(tmpl),

	       



	   })

	   return RegistryView;
       })
