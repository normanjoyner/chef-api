// import dependencies
var config = require([__dirname, "..", "config"].join("/")).options;
var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods;

var methods = {

    getEnvironments: function(fn){
        http_methods.get([config.host_url, "environments"].join("/"), null, function(err, response){
            fn(err, response);
        });
    },

    getEnvironment: function(environment, fn){
        http_methods.get([config.host_url, "environments", environment].join("/"), null, function(err, response){
            fn(err, response);
        });
    },

    getEnvironmentCookbooks: function(environment, fn){
        http_methods.get([config.host_url, "environments", environment, "cookbooks"].join("/"), null, function(err, response){
            fn(err, response);
        });
    },

    getEnvironmentCookbook: function(environment, cookbook, fn){
        http_methods.get([config.host_url, "environments", environment, "cookbooks", cookbook].join("/"), null, function(err, response){
            fn(err, response);
        });
    }

}

exports.methods = methods;
