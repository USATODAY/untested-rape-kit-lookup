define([
   "jquery",
   "underscore",
   "backbone",
   "helpers"
], function(jQuery, _, Backbone, helpers) {
    return Backbone.Model.extend({
        initialize: function() {
            this.set({
                "searchName": helpers.cleanName(this.get('Agency'))
            });
        }

    });
});
