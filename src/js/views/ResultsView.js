define([
   "jquery",
   "underscore",
   "backbone",
   "config",
   "views/EntryView"
], function(jQuery, _, Backbone, config, EntryView) {
    return Backbone.View.extend({
        initialize: function() {
            this.subViews = [];
        },
        render: function(models) {
            var _this = this;
            _.each(this.subViews, function(subView) {
                subView.remove();
            });
            _.each(models, function(entryModel) {
                var entryView = new EntryView({model: entryModel});
                _this.subViews.push(entryView);
                _this.$el.append(entryView.el);
            });
            console.log(this.el);
            return this;
        },
        template: "",

    });
});
