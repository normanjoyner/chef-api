exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
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
        },

        createNode: function(body, fn){
            http_methods.post([config.host_url, "nodes"].join("/"), body, function(err, response){
                fn(err, response);
            });
        },

        deleteNode: function(node, fn){
            http_methods.del([config.host_url, "nodes", node].join("/"), function(err, response){
                fn(err, response);
            });
        },

        editNode: function(node, data, fn){
            http_methods.put([config.host_url, "nodes", node].join("/"), data, function(err, response){
                fn(err, response);
            });
        }
    }

}
