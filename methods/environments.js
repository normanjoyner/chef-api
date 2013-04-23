exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
        getEnvironments: function(fn){
            http_methods.get([config.host_url, "environments"].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        createEnvironment: function(body, fn){
            http_methods.post([config.host_url, "environments"].join("/"), body, function(err, response){
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

}
