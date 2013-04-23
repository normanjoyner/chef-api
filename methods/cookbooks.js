exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
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
        },

        editCookbookVersion: function(cookbook, version, data, fn){
            http_methods.put([config.host_url, "cookbooks", cookbook, version].join("/"), data, function(err, response){
                fn(err, response);
            });
        },

        deleteCookbookVersion: function(cookbook, version, data, fn){
            http_methods.del([config.host_url, "cookbooks", cookbook, version].join("/"), data, function(err, response){
                fn(err, response);
            });
        }
    }

}
