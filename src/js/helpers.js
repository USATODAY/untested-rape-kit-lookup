define([],
function() {
    return {
        cleanName: function(string) {
            return string.trim().replace(/\s/g, "-").replace(/[\.,\/#!$%\^&\*;:{}=_`~()]/g,"").toLowerCase();
        },
        slugify: function(text) {
            return text.toString().toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');            // Trim - from end of text
        }
    };
});
