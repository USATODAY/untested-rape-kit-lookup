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
                "slug": helpers.slugify(this.get('Agency'))
            });
        }
    });
});
