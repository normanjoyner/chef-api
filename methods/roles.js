exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
        getRoles: function(fn){
            http_methods.get([config.host_url, "roles"].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        getRole: function(role, fn){
            http_methods.get([config.host_url, "roles", role].join("/"), null, function(err, response){
                fn(err, response);
            });
        }
    }

}
