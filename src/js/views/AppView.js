define([
   "jquery",
   "underscore",
   "backbone",
   "templates",
   "helpers",
   "views/ResultsView"
], function(jQuery, _, Backbone, templates, helpers, ResultsView) {
    return Backbone.View.extend({
        initialize: function() {
            console.log(this.collection);
            this.render();
        },
        render: function() {
            this.$el.html(this.template());
            this.resultsView = new ResultsView({el: this.$(".iapp-search-results-wrap")});
            return this;
        },
        events: {
            "keyup .iapp-search-input": "onSearchChange"
        },
        template: templates["AppView.html"],
        filterItems: _.throttle(function(filterTerm) {
            filterTerm = helpers.cleanName(filterTerm);
            var filteredArray = this.collection.filter(function(entryModel) {
                return entryModel.get("searchName").indexOf(filterTerm) > -1;
            });
            console.log(filteredArray);
            return filteredArray;
        }, 200),
        onSearchChange: function(e) {
            var _this = this;
            var filterTerm = this.$('.iapp-search-input').val();
            var filteredItems = this.filterItems(filterTerm);
            this.resultsView.render(filteredItems);
        }

    });
});
