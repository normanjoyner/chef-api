// import dependencies
var config = require([__dirname, "..", "config"].join("/")).options;
var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods;

var methods = {

    getNodes: function(fn){
        http_methods.get([config.host_url, "nodes"].join("/"), null, function(err, response){
            fn(err, response);
        });
    },

    getNode: function(node, fn){
        http_methods.get([config.host_url, "nodes", node].join("/"), null, function(err, response){
            fn(err, response);
        });
    },

    getNodeCookbooks: function(node, fn){
        http_methods.get([config.host_url, "nodes", node, "cookbooks"].join("/"), null, function(err, response){
            fn(err, response);
        });
    }

}

exports.methods = methods;
