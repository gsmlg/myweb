/**
 * Created with JetBrains WebStorm.
 * User: Gao
 * Date: 13-5-13
 * Time: 下午11:06
 * To change this template use File | Settings | File Templates.
 */
define(['lodash','backbone'],function(_,Backbone){
    var UserModel = Backbone.Model.extend({
        'url' : '/user',
        'idAttribute' : "uid",
        'defaults':{
            'name':'用户名',
            'group':'用户组',
            'start': '我的主页'
        }
    });
    return UserModel;
})