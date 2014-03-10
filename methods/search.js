exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
        // http://docs.opscode.com/api_chef_server_search.html#get
        getSearch: function(fn){
            http_methods.get([config.host_url, "search"].join("/"), null, function(err, response){
                return fn(err, response);
            });
        },

        // http://docs.opscode.com/api_chef_server_search_index.html#get
        getSearchIndex: function(index, qs, fn){
            http_methods.get([config.host_url, "search", index].join("/"), qs, function(err, response){
                return fn(err, response);
            });
        },
        // http://docs.opscode.com/api_chef_server_search_index.html#post
        postSearchIndex: function(index, data, fn){
            http_methods.post([config.host_url, "search", index].join("/"), data, function(err, response){
                return fn(err, response);
            });
        }
    }
}
