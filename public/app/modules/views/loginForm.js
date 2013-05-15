define(['lodash', 'jquery', 'backbone', 'text!templates/loginForm.html'], function(_, $, Backbone, tmpl){
    var FormView = Backbone.View.extend({
	'template': _.template(tmpl)
    })
    return FormView;
})
