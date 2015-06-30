define(
  [
    'jquery',
    'underscore',
    'templates',
    'dataManager',
    'config',
    'collections/EntriesCollection',
    'views/AppView'
  ],
  function(jQuery, _, templates, DataManager, config, EntriesCollection, AppView){

    return {
        
        init: function() {
            var dataManager = new DataManager(config.dataURL);
            dataManager.getData(function(data) { 
                var entriesCollection = new EntriesCollection(data);
                var appView = new AppView({collection: entriesCollection});
                jQuery(".iapp-page-wrap").append(appView.el);
            });
        }

    };


});
