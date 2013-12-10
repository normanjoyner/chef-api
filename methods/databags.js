exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
        // http://docs.opscode.com/api_chef_server_data_bag.html#get
        getDataBags: function(fn){
            http_methods.get([config.host_url, "data"].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_data_bag_name.html#get
        getDataBag: function(databag, fn){
            http_methods.get([config.host_url, "data",  databag].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_data_bag_item.html#get
        getDataBagItem: function(databag, item, fn){
            http_methods.get([config.host_url, "data",  databag, item].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_data_bag_item.html#put
        editDataBagItem: function(databag, item, data, fn){
            http_methods.put([config.host_url, "data",  databag, item].join("/"), data, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_data_bag.html#post
        createDataBag: function(data, fn){
            http_methods.post([config.host_url, "data"].join("/"), data, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_data_bag_name.html#post
        createDataBagItem: function(databag, data, fn){
            http_methods.post([config.host_url, "data",  databag].join("/"), data, function(err, response){
                fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_data_bag_item.html#delete
        deleteDataBagItem: function(databag, item, fn){
            http_methods.del([config.host_url, "data", databag, item].join("/"), function(err, response){
                fn(err, response);
            });
        }
    }

}
