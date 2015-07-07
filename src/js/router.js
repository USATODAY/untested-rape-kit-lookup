define([
    "jquery",
    "underscore",
    'lib/BackboneRouter',
    ], 
    function($, _, Backbone) { 
        var Router = Backbone.Router.extend({

            routes: {
                "": "home",
                "search/": "search",
                "search/:slug": "detail",
                "info/": "info"
            },

            home: function() {
                Backbone.trigger("router:home");
            },

            search: function() {
                Backbone.trigger("router:search");
            },

            detail: function(slug) {
                Backbone.trigger("router:detail", slug);
            },
            info: function() {
                Backbone.trigger("router:info");
            }

        });


        return new Router();
});
