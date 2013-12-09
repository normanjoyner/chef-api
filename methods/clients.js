exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
        getClients: function(fn){
            http_methods.get([config.host_url, "clients"].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        getClient: function(client, fn){
            http_methods.get([config.host_url, "clients", client].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        editClient: function(client, data, fn){
            http_methods.put([config.host_url, "clients", client].join("/"), data, function(err, response){
                fn(err, response);
            });
        },

        deleteClient: function(client, fn) {
            http_methods.del([config.host_url, "clients", client].join("/"), function(err, response) {
                fn(err, response);
            });
        }
    }

}
