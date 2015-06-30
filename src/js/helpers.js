define([],
function() {
    return {
        cleanName: function(string) {
            return string.trim().replace(/\s/g, "-").replace(/[\.,\/#!$%\^&\*;:{}=_`~()]/g,"").toLowerCase();
        }
    };
});
