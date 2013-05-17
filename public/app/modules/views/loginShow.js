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
	    img = R.image('images/1.jpg',16,12,32,24);
	    img.attr({'opacity': 0})

	    anim = Raphael.animation({
	    	"30%" : {'transform':'r1080','opacity':1, 'x': 160,'y': 120, 'width':320, 'height': 240},
	    	"70%":{},
	    	"100%":{'transform':'r0','opacity':0, 'x': 624,'y': 468, 'width':32, 'height': 24}
	    },10e3,'<>',function(){
	    var n = Math.random() * 5 | 0 + 1;
		this.attr({src : 'images/'+n+'.jpg', 'x': 16,'y': 12, 'width':32, 'height': 24});
	    })
	    
	    img.animate(anim.repeat(Infinity))


	}

    })
    return ShowView;
})
