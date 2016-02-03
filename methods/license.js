exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
        // https://docs.chef.io/api_chef_server.html#license
        getLicense: function(fn){
            http_methods.get([config.host_url, "license"].join("/"), null, function(err, response){
                return fn(err, response);
            });
        }
    }
}
