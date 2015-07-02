define([
   "jquery",
   "underscore",
   "backbone",
   "models/EntryModel"
], function(jQuery, _, Backbone, EntryModel) {
    return Backbone.Collection.extend({
        model: EntryModel

    });
});
