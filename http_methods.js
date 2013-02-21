var operations = require([__dirname, "operations"].join("/")).operations;

var http_methods = {

    get: function(uri, qs, fn){
        operations.request(uri, qs, null, "GET", function(err, response){
            if(response.error){
                err = new Error(response.error);
                response = null;
            }

            fn(err, response);
        });
    },

    put: function(uri, data, fn){
        operations.request(uri, null, data, "PUT", function(err, response){
            if(response.error){
                err = new Error(response.error);
                response = null;
            }

            fn(err, response);
        });
    },

    post: function(uri, data, fn){
        operations.request(uri, null, data, "POST", function(err, response){
            if(response.error){
                err = new Error(response.error);
                response = null;
            }

            fn(err, response);
        });
    }

}

exports.http_methods = http_methods;
