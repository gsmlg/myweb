define(['backbone','jquery','lodash','raphael','text!templates/loginShow.html'],function(Backbone, $, _, Raphael, tmpl){
    var ShowView = Backbone.View.extend({
	template: _.template(tmpl),
	initialize: function(){


	},
	events:{
	    'load #loginSlide img':'afterRender'
	},
	afterRender: function(){
	    var R = Raphael('loginSlide',640,480), img, anim, angel = 360;
	    img = R.image('images/1.jpg',160,120,320,240);
	    
	    anim = Raphael.animation({transform:'r360',src:'images/3.jpg'},3e3,'',function(){
		var n = Math.random() * 5 | 0 + 1;
		this.attr({src : 'images/'+n+'.jpg'});
	    });
	    
	    img.animate(anim.repeat(Infinity))


	}

    })
    return ShowView;
})
