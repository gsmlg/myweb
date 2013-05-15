/**
 * Created with JetBrains WebStorm.
 * User: Gao
 * Date: 13-5-13
 * Time: 下午10:36
 * To change this template use File | Settings | File Templates.
 */
define(['lodash','backbone','jquery','modules/models/user','text!templates/head.html'],function(_, Backbone, $, user, tmpl){
    var HeadView = Backbone.View.extend({
        'el': false,
        'template': _.template(tmpl),
        'initialize': function(){
            this.model = new user;
	        this.listenTo(this.model,'change',this.render);
            return this;
        },
        serialize: function(){
            return this.model.toJSON();
        },
        'events': {
            'click .first-name':'getUser',
            'click .last-name':'getGroup',
            'keypress #search input':'goSearch',
            'click #search button': 'goSearch',
            'focus #search input': 'focusIn',
            'blur #search input': 'focusOut'
        },
        'render' : function(template, context){
            return template(context);
        },
        'getUser': function(){
            var uid = this.model.toJSON().uid;
            if (!uid) {
                Backbone.history.navigate('login', true);
            } else {
                Backbone.history.navigate('user', true);
            }
        },
        'getGroup': function(){
            var uid = this.model.toJSON().uid;
            if (!uid) {
                Backbone.history.navigate('registry', true);
            } else {
                Backbone.history.navigate('user/group', true);
            }
        },
        'focusIn': function(){
            this.$el.find('#search').animate({width:'600px'},300);
        },
        'focusOut': function(){
            this.$el.find('#search').animate({width:'380px'},300);
        }
    })
    return HeadView;
})
