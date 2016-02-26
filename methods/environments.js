exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
        // https://docs.chef.io/api_chef_server_environments.html#get
        getEnvironments: function(fn){
            http_methods.get([config.host_url, "environments"].join("/"), null, function(err, response){
                return fn(err, response);
            });
        },

        // https://docs.chef.io/api_chef_server_environments.html#post
        createEnvironment: function(body, fn){
            http_methods.post([config.host_url, "environments"].join("/"), null, body, function(err, response){
                return fn(err, response);
            });
        },

        // https://docs.chef.io/api_chef_server_environments_name.html#delete
        deleteEnvironment: function(environment, fn){
            http_methods.del([config.host_url, "environments", environment].join("/"), function(err, response){
                return fn(err, response);
            });
        },

        // https://docs.chef.io/api_chef_server_environments_name.html#put
        editEnvironment: function(environment, body, fn){
            http_methods.put([config.host_url, "environments", environment].join("/"),null ,body, function(err, response){
                return fn(err, response);
            });
        },

        // https://docs.chef.io/api_chef_server_environments_name.html#get
        getEnvironment: function(environment, fn){
            http_methods.get([config.host_url, "environments", environment].join("/"), null, function(err, response){
                return fn(err, response);
            });
        },

        // https://docs.chef.io/api_chef_server_environments_cookbooks.html#get
        getEnvironmentCookbooks: function(environment, fn){
            http_methods.get([config.host_url, "environments", environment, "cookbooks"].join("/"), null, function(err, response){
                return fn(err, response);
            });
        },

        // https://docs.chef.io/api_chef_server_environments_cookbook_name.html#get
        getEnvironmentCookbook: function(environment, cookbook, fn){
            http_methods.get([config.host_url, "environments", environment, "cookbooks", cookbook].join("/"), null, function(err, response){
                return fn(err, response);
            });
        },

        //https://docs.chef.io/api_chef_server_environments_node.html#get
        getEnvironmentNodes: function(environment, fn){
            http_methods.get([config.host_url, "environments", environment, "nodes"].join("/"), null, function(err, response){
                return fn(err, response);
            });
        }

        /*
            not yet implemented:
            https://docs.chef.io/api_chef_server_environments_cookbook_version.html#post
            https://docs.chef.io/api_chef_server_environments_recipe.html#get
            https://docs.chef.io/api_chef_server_environments_role.html#get
        */
    }

}
