// import dependencies
var config = require([__dirname, "..", "config"].join("/")).options;
var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods;

var methods = {

    getClients: function(fn){
        http_methods.get([config.host_url, "clients"].join("/"), null, function(err, response){
            fn(err, response);
        });
    },

    getClient: function(client, fn){
        http_methods.get([config.host_url, "clients", client].join("/"), null, function(err, response){
            fn(err, response);
        });
    }

}

exports.methods = methods;
