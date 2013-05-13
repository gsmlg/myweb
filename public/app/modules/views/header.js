/**
 * Created with JetBrains WebStorm.
 * User: Gao
 * Date: 13-5-13
 * Time: 下午10:36
 * To change this template use File | Settings | File Templates.
 */
define(['lodash','backbone','jquery','modules/model/user','text!templates/head.html'],function(_, Backbone, $, user, tmpl){
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
        'render' : function(template, context){
            return template(context);
        }
    })
    return HeadView;
})