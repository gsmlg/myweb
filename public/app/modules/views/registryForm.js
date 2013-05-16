define(['jquery','lodash','backbone','text!templates/registry.html','modules/views/modernGrowl'],
       function($, _, Backbone, tmpl, growl){
	   var RegistryView = Backbone.View.extend({
	     template: _.template(tmpl),
             events: {
               'submit form': 'registry'

             },
             registry: function(event) {
               event.preventDefault();
               var self = this;
               self.doing = self.doing || false;
               if (self.doing) return;
               self.doing = true;
               self.$el.find(':submit').addClass('disabled');
               setTimeout(function(){
                   self.doing = false;
                   self.$el.find(':submit').removeClass('disabled')
               }, 5000);
               $.ajax('/user/registry',{
                 'type':'post',
                 'data': $(event.target).serialize(),
                 'success': function(xhr,data){
                   alert('suc');
                   console.log(data);
                 },
                 'error': function(xhr,err){
                   new growl({level:'error',message:'网络连接出现问题，请稍后再尝试！'});
                 },
                 'dataType':'json'
               });
             }
	   });

	   return RegistryView;
       });
