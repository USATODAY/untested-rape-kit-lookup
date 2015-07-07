define([
   "jquery",
   "underscore",
   "backbone",
   "helpers"
], function(jQuery, _, Backbone, helpers) {
    return Backbone.Model.extend({
        initialize: function() {
            this.set({
                "searchName": helpers.cleanName(this.get('Agency')),
                "Total_untested_kits_pretty": this.get("Total_untested_kits").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                "slug": this.slugify(this.get('Agency'))
            });
        },
        slugify: function(text) {
            return text.toString().toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');            // Trim - from end of text
        }

    });
});
