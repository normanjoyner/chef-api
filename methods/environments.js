exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
        // http://docs.opscode.com/api_chef_server_environments.html#get
        getEnvironments: function(fn){
            http_methods.get([config.host_url, "environments"].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_environments.html#post
        createEnvironment: function(body, fn){
            http_methods.post([config.host_url, "environments"].join("/"), body, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_environments_name.html#get
        getEnvironment: function(environment, fn){
            http_methods.get([config.host_url, "environments", environment].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_environments_cookbooks.html#get
        getEnvironmentCookbooks: function(environment, fn){
            http_methods.get([config.host_url, "environments", environment, "cookbooks"].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_environments_cookbook_name.html#get
        getEnvironmentCookbook: function(environment, cookbook, fn){
            http_methods.get([config.host_url, "environments", environment, "cookbooks", cookbook].join("/"), null, function(err, response){
                fn(err, response);
            });
        }

        /*
            not yet implemented:
            http://docs.opscode.com/api_chef_server_environments_name.html#put
            http://docs.opscode.com/api_chef_server_environments_name.html#delete
            http://docs.opscode.com/api_chef_server_environments_cookbook_version.html#post
            http://docs.opscode.com/api_chef_server_environments_node.html#get
            http://docs.opscode.com/api_chef_server_environments_recipe.html#get
            http://docs.opscode.com/api_chef_server_environments_role.html#get
        */
    }

}
