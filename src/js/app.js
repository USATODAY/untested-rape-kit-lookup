define(
  [
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'dataManager',
    'config',
    'collections/EntriesCollection',
    'views/AppView'
  ],
  function(jQuery, _, Backbone, templates, DataManager, config, EntriesCollection, AppView){

    return {
        
        init: function() {
            var dataManager = new DataManager(config.dataURL);
            var $pageWrap = jQuery('.iapp-page-wrap');
            updateHeight();
            dataManager.getData(function(data) { 
                var entriesCollection = new EntriesCollection(data);
                var appView = new AppView({collection: entriesCollection});
                $pageWrap.append(appView.el);
            });

            $(window).resize(onResize);

            function onResize(e) {
                Backbone.trigger("window:resize");
                updateHeight(e);
            }

            function updateHeight(e) {
                var newHeight;
                if (!config.isMobile) {
                    newHeight = window.innerHeight - 40;
                } else {
                    newHeight = window.innerHeight - 50;
                }
                $pageWrap.height(newHeight);
            }
        }

    };


});
