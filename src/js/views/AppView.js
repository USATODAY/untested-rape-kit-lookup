define([
   "jquery",
   "underscore",
   "backbone",
   "templates",
   "helpers",
   "config",
   "views/ResultsView",
   "views/DetailView",
   "views/VideoView"
], function(jQuery, _, Backbone, templates, helpers, config, ResultsView, DetailView, VideoView) {
    return Backbone.View.extend({
        initialize: function() {
            this.listenTo(Backbone, "detail:show", this.onDetailShow);
            this.listenTo(Backbone, "video:end", this.onVideoEnd);
            this.render();
        },
        render: function() {
            this.$el.html(this.template({isMobile: config.isMobile}));
            var videoView = new VideoView();
            this.$el.append(videoView.render().el);
            this.resultsView = new ResultsView({el: this.$(".iapp-search-results-wrap")});
            return this;
        },
        events: {
            "keyup .iapp-search-input": "onSearchChange",
            "click .iapp-info-button": "showInfo",
            "click .iapp-play-button": "showVideo",
            "click .iapp-info-close": "closeInfo",
            "click .js-iapp-info-background": "closeInfo"
        },
        template: templates["AppView.html"],
        filterItems: _.throttle(function(filterTerm) {
            filterTerm = helpers.cleanName(filterTerm);
            var filteredArray = this.collection.filter(function(entryModel) {
                return entryModel.get("searchName").indexOf(filterTerm) > -1;
            });
            return filteredArray;
        }, 200),
        onSearchChange: function(e) {
            var _this = this;
            var filterTerm = this.$('.iapp-search-input').val();
            var filteredItems = this.filterItems(filterTerm);
            if (filterTerm !== "") {
                this.resultsView.render(filteredItems);
            } else {
                this.resultsView.hide();
            }
        },
        onDetailShow: function(entryModel) {
            this.detailView = new DetailView({model: entryModel});
            this.$el.append(this.detailView.el);
        },
        onVideoEnd: function() {
            this.$('.iapp-search').removeClass('iapp-fade');
        },
        showVideo: function() {
            Backbone.trigger('video:show');
            this.$('.iapp-search').addClass('iapp-fade');
        },
        showInfo : function(e) {
            this.$('.iapp-info-wrap').show();
        },
        closeInfo: function(e) {
            this.$('.iapp-info-wrap').hide();
        }

    });
});
