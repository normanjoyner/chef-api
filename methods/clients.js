exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
        // http://docs.opscode.com/api_chef_server_clients.html#get
        getClients: function(fn){
            http_methods.get([config.host_url, "clients"].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_clients_name.html#get
        getClient: function(client, fn){
            http_methods.get([config.host_url, "clients", client].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_clients_name.html#put
        editClient: function(client, data, fn){
            http_methods.put([config.host_url, "clients", client].join("/"), data, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_clients.html#post
        createClient: function(data, fn){
            http_methods.post([config.host_url, "clients"].join("/"), data, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_clients_name.html#delete
        deleteClient: function(client, fn){
            http_methods.del([config.host_url, "clients", client].join("/"), function(err, response){
                fn(err, response);
            });
        }
    }

}
