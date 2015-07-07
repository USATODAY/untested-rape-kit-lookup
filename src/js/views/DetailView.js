define([
   "jquery",
   "underscore",
   "backbone",
   "config",
   "router", 
   "templates"
], function(jQuery, _, Backbone, config, router, templates) {
    return Backbone.View.extend({
        initialize: function() {
            router.navigate('search/' + this.model.get('slug'));
            this.render();
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
        },
        template: templates["DetailView.html"],
        events: {
            "click .iapp-detail-close-button": "onCloseClick",
            "click .iapp-detail-background": "onCloseClick"
        },
        onCloseClick: function(e) {
            router.navigate('search/');
            this.remove();
        }

    });
});
