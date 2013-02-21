// import dependencies
var config = require([__dirname, "..", "config"].join("/")).options;
var http_methods = require([__dirname, "..", "http_methods"].join("/")).http_methods;

var methods = {

    getSearch: function(fn){
        http_methods.get([config.host_url, "search"].join("/"), null, function(err, response){
            fn(err, response);
        });
    }, 

    getSearchIndex: function(index, qs, fn){
        http_methods.get([config.host_url, "search", index].join("/"), qs, function(err, response){
            fn(err, response);
        });
    }

}

exports.methods = methods;
