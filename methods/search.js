exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
        // http://docs.opscode.com/api_chef_server_search.html#get
        getSearch: function(fn){
            http_methods.get([config.host_url, "search"].join("/"), null, function(err, response){
                fn(err, response);
            });
        }, 

        // http://docs.opscode.com/api_chef_server_search_index.html#get
        getSearchIndex: function(index, qs, fn){
            http_methods.get([config.host_url, "search", index].join("/"), qs, function(err, response){
                fn(err, response);
            });
        }
        /*
            not yet implemented:
            // http://docs.opscode.com/api_chef_server_search_index.html#post
        */
    }
}
