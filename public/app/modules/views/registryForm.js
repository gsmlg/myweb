define(['jquery','lodash','backbone','text!templates/registry.html',
    'modules/views/modernGrowl','modules/models/user'],
    function($, _, Backbone, tmpl, growl, user){
        var RegistryView = Backbone.View.extend({
            template: _.template(tmpl),
            events: {
                'submit form': 'registry',
                'click :button':'clearInput'
            },
            registry: function(event) {
                event.preventDefault();
                var form = this.$el.find('form').serializeArray();
                var formData = {};
                _.each(form,function(v){formData[v.name] = v.value;});
                if (formData.passwd !== formData.passwd2) {
                    this.model.validationError = 'password diff'
                    this.model.trigger('invalid');
                    return;
                }
                var self = this;
                self.doing = self.doing || false;
                if (self.doing) return;
                self.doing = true;
                self.$el.find(':submit').addClass('disabled');
                setTimeout(function(){
                    self.doing = false;
                    self.$el.find(':submit').removeClass('disabled');
                }, 5000);
                this.model.save(formData, {wait : true,url:this.model.registryUrl});
            },
            clearInput: function(e){
                $(e.target).prev().val('');
                e.preventDefault();
            },
            initialize: function() {
                this.model = new user;
                this.listenTo(this.model, 'sync',this.sync);
                this.listenTo(this.model, 'success',this.success);
                this.listenTo(this.model, 'invalid', this.invalidErr);

            },
            success: function(model, xhr) {

                new growl({level:'info', message: model.toJSON})
            },
            error: function( model, xhr ) {
                arguments;
                new growl({level:'error', message: this.model})
            },
            invalidErr: function(){
                new growl({level:'warning',message: this.model.validationError});
            }



        });

        return RegistryView;
    });
