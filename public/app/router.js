define([
  // Application.
  "app"
],

function(app) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
      routes: {
	  "": "index",
	  '!login': 'login',
	  '!registry': 'registry'
      },

      index: function() {
          require(['modules/views/header','modules/views/content'],function(head,content){
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
	  app.userLayout('login');
      },

      registry: function() {
	  app.userLayout('registry');
      }

  });

  return Router;

});
