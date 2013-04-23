exports.http_methods = function(config){
    var operations = require([__dirname, "operations"].join("/")).operations(config);

    return {
        get: function(uri, qs, fn){
            operations.request(uri, qs, null, "GET", function(err, response){
                if(err)
                    throw err;

                if(response.error){
                    err = new Error(response.error);
                    response = null;
                }

                fn(err, response);
            });
        },

        put: function(uri, data, fn){
            operations.request(uri, null, data, "PUT", function(err, response){
                if(err)
                    throw err;

                if(response.error){
                    err = new Error(response.error);
                    response = null;
                }

                fn(err, response);
            });
        },

        post: function(uri, data, fn){
            operations.request(uri, null, data, "POST", function(err, response){
                if(err)
                    throw err;

                if(response.error){
                    err = new Error(response.error);
                    response = null;
                }

                fn(err, response);
            });
        },

        del: function(uri, fn){
            operations.request(uri, null, null, "DELETE", function(err, response){
                if(err)
                    throw err;

                if(response.error){
                    err = new Error(response.error);
                    response = null;
                }

                fn(err, response);
            });
        }
    }
}

