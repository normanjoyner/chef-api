exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
        // http://docs.opscode.com/api_chef_server_cookbooks.html#get
        getCookbooks: function(qs, fn){
            http_methods.get([config.host_url, "cookbooks"].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_cookbooks_name.html#get
        getCookbook: function(cookbook, qs, fn){
            http_methods.get([config.host_url, "cookbooks", cookbook].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_cookbooks_version.html#get
        getCookbookVersion: function(cookbook, version, fn){
            http_methods.get([config.host_url, "cookbooks", cookbook, version].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_cookbooks_version.html#put
        editCookbookVersion: function(cookbook, version, data, fn){
            http_methods.put([config.host_url, "cookbooks", cookbook, version].join("/"), data, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_cookbooks_version.html#delete
        deleteCookbookVersion: function(cookbook, version, data, fn){
            http_methods.del([config.host_url, "cookbooks", cookbook, version].join("/"), data, function(err, response){
                fn(err, response);
            });
        }
    }

}
