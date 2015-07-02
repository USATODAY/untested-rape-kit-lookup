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
        events: {
            "click": "onClick"
        }, 
        className: "iapp-results-entry",
        onClick: function(e) {
            Backbone.trigger("detail:show", this.model);
        }

    });
});
