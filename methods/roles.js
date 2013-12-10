exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
        // http://docs.opscode.com/api_chef_server_roles.html#get
        getRoles: function(fn){
            http_methods.get([config.host_url, "roles"].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_roles_name.html#get
        getRole: function(role, fn){
            http_methods.get([config.host_url, "roles", role].join("/"), null, function(err, response){
                fn(err, response);
            });
        }

        /*
            not yet implemented:
            // http://docs.opscode.com/api_chef_server_roles.html#post
            // http://docs.opscode.com/api_chef_server_roles_name.html#put
            // http://docs.opscode.com/api_chef_server_roles_name.html#delete
            // http://docs.opscode.com/api_chef_server_roles_name_environments.html#get
            // http://docs.opscode.com/api_chef_server_roles_name_environments_name.html#get
        */
    }

}
