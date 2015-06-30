define([
   "jquery",
   "underscore",
   "backbone",
   "config",
   "templates"
], function(jQuery, _, Backbone, config, templates) {
    return Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
        },
        template: templates["EntryView.html"],

    });
});
