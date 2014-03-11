exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
        // http://docs.opscode.com/api_chef_server_nodes.html#get
        getNodes: function(fn){
            http_methods.get([config.host_url, "nodes"].join("/"), null, function(err, response){
                return fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_nodes_name.html#get
        getNode: function(node, fn){
            http_methods.get([config.host_url, "nodes", node].join("/"), null, function(err, response){
                return fn(err, response);
            });
        },

        getNodeCookbooks: function(node, fn){
            http_methods.get([config.host_url, "nodes", node, "cookbooks"].join("/"), null, function(err, response){
                return fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_nodes.html#post
        createNode: function(data, fn){
            http_methods.post([config.host_url, "nodes"].join("/"), null, data, function(err, response){
                return fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_nodes_name.html#delete
        deleteNode: function(node, fn){
            http_methods.del([config.host_url, "nodes", node].join("/"), function(err, response){
                return fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_nodes_name.html#put
        editNode: function(node, data, fn){
            http_methods.put([config.host_url, "nodes", node].join("/"), null, data, function(err, response){
                return fn(err, response);
            });
        }
    }

}
