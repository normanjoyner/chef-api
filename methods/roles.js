exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
        // http://docs.opscode.com/api_chef_server_roles.html#get
        getRoles: function(fn){
            http_methods.get([config.host_url, "roles"].join("/"), null, function(err, response){
                return fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_roles_name.html#get
        getRole: function(role, fn){
            http_methods.get([config.host_url, "roles", role].join("/"), null, function(err, response){
                return fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_roles.html#post
        createRole: function(body, fn){
            http_methods.post([config.host_url, "roles"].join("/"), null, body, function(err, response){
                return fn(err, response);
            });
        },
 
        // http://docs.opscode.com/api_chef_server_roles_name.html#delete
        deleteRole: function(role, fn){
             http_methods.del([config.host_url, "roles", role].join("/"), function(err, response){
                 return fn(err, response);
             });
         },
 
         // http://docs.opscode.com/api_chef_server_roles_name.html#put
         editRole: function(role, data, fn){
             http_methods.put([config.host_url, "roles", role].join("/"), null, data, function(err, response){
                 return fn(err, response);
             });
         }

        /*
            not yet implemented:
            // http://docs.opscode.com/api_chef_server_roles_name_environments.html#get
            // http://docs.opscode.com/api_chef_server_roles_name_environments_name.html#get
        */
    }

}
