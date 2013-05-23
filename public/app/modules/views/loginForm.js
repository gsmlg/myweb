define(['lodash', 'jquery', 'backbone', 'text!templates/loginForm.html',
		 'modules/views/modernGrowl'], 
		 function(_, $, Backbone, tmpl, growl){
    var FormView = Backbone.View.extend({
		'template': _.template(tmpl),
		'events': {
			'submit form': 'doLogin'
		},
		doLogin: function(event) {
			event.preventDefault();
			var form = this.$el.find('form').serializeArray();
            var formData = {};
            _.each(form,function(v){formData[v.name] = v.value;});
            var self = this;
            self.doing = self.doing || false;
            if (self.doing) return;
            self.doing = true;
            self.$el.find(':submit').addClass('disabled');
            setTimeout(function(){
                self.doing = false;
                self.$el.find(':submit').removeClass('disabled');
            }, 3000);
            $.post('/user/login', formData, function(result, xhr) {
            	if (result.status === 0 ) {
            		new growl({'level': 'error', message: result.message });
            	} else {
            		new growl({'level': 'info', message: result.message });
            	}
            },'json')
		}
    })
    return FormView;
})
