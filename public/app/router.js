define([
  // Application.
  "app"
],

function(app) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
      'routes' : {
          "": "index",
          'login': 'login',
          'registry': 'registry'
      },

      index: function() {

          require(['modules/views/header','modules/views/content'],
		  function(head,content){
		      app.layout = null;
		      app.useLayout('index',{
			  views: {
			      '#head' : new head,
			      '#content' : new content
			  },
			  afterRender:function(){
			      // this.$el.appendTo('main');
			  }
		      }).render();

		  });
      },

      login: function(){
	  require(['modules/views/loginShow','modules/views/loginForm'], 
		  function(show, form){

		      app.layout = null;
		      app.useLayout('login',{
			  'views': {
			      '#show': new show,
			      '#form': new form
			  },
			  'afterRender':function(){
			      this.views['#show'].afterRender();
			  }
		      }).render();

		  })
      },

    registry: function() {
	require(['modules/views/loginShow','modules/views/registryForm'],
		function(show, form){
		  app.layout = null;
		  app.useLayout('login',{
		    'views': {
		      '#show': new show,
		      '#form': new form
		    },
		    'afterRender':function(){
		      this.views['#show'].afterRender();
		    }
		  }).render();
		})

      }

  });

  return Router;

});
