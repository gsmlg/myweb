define([
  // Application.
  "app"
],

function(app) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
        require(['modules/views/header','modules/views/content'],function(head,content){
            app.useLayout('index',{
                views: {
                    '#head' : new head,
//                    '#content' : new content
                },
                afterRender:function(){
                    this.$el.appendTo('main');
                }
            }).render();
            console.log('load index!');
        });

    }
  });

  return Router;

});
