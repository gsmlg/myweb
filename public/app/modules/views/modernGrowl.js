define(['jquery','lodash','backbone','text!templates/growl.html'],function($, _, Backbone, tpl){
  var GrowlView = Backbone.View.extend({
    'template': _.template(tpl),
    'manage': false,
    '$': $,
    'attribues':{'class':'fg-color-white'},
    'initialize': function(opt){
      this.setBox().render(opt).$el.appendTo('#growl').animate({'top': '40%'},opt.speed || 'fast');
    },
    'render': function(opt){
      switch (opt.level) {
      case 'error':
        opt.level = 'error';
        break;
      case 'warning':
        opt.level = 'warning';
        break;
      default:
        opt.level = 'info';
        break
      }
      opt.message = opt.message || 'Infomation ...';
      this.$el.append(this.template(opt)).addClass(opt.level + '-bar fg-color-white');
      return this;
    },
    'setBox': function(){
      if ($('#growl').length){
        this.box = $('#growl');
      } else {
        this.box = $('<div />').attr({'id':'growl'}).appendTo('body');
      }
      return this;
    },
    'events': {
      'click button': 'remove'
    }
  });
  return GrowlView;
})
