exports.methods = function(config){

    var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods(config);

    return {
        getUsers: function(fn){
            http_methods.get([config.host_url, "users"].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        createUser: function(body, fn){
            http_methods.post([config.host_url, "users"].join("/"), body, function(err, response){
                fn(err, response);
            });
        },

        getUser: function(user, fn){
            http_methods.get([config.host_url, "users", user].join("/"), null, function(err, response){
                fn(err, response);
            });
        },

        deleteUser: function(user, fn){
            http_methods.del([config.host_url, "users", user].join("/"), function(err, response){
                fn(err, response);
            });
        },

        editUser: function(user, data, fn){
            http_methods.put([config.host_url, "users", user].join("/"), data, function(err, response){
                fn(err, response);
            });
        }
    }
}
