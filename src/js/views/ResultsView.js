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
            this.hide();
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
            this.show();
            return this;
        },
        hide: function() {
            this.$el.hide();
        },
        show: function() {
            this.$el.show();
        }

    });
});
