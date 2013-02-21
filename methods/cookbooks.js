// import dependencies
var config = require([__dirname, "..", "config"].join("/")).options;
var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods;

var methods = {

    getCookbooks: function(fn){
        http_methods.get([config.host_url, "cookbooks"].join("/"), null, function(err, response){
            fn(err, response);
        });
    },

    getCookbook: function(cookbook, fn){
        http_methods.get([config.host_url, "cookbooks", cookbook].join("/"), null, function(err, response){
            fn(err, response);
        });
    },

    getCookbookVersion: function(cookbook, version, fn){
        http_methods.get([config.host_url, "cookbooks", cookbook, version].join("/"), null, function(err, response){
            fn(err, response);
        });
    }

}

exports.methods = methods;
