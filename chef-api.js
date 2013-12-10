// import dependencies
var fs = require("fs");
var _ = require("lodash");
var methodsFiles = fs.readdirSync([__dirname, "methods"].join("/"));

exports.getObject = function(){
    var object = {};

    object.options = {};
    object.config = function(options){
        object.options.name =  options.user_name || options.client_name,
        object.options.key_contents = options.key || fs.readFileSync(options.key_path),
        object.options.host_url = options.url || ["https://api.opscode.com/organizations", options.organization].join("/")
        if(options.hasOwnProperty("ca")) {
            // absent means default,
            // null means unsafe,
            // specific means specific
            object.options.ca = options.ca;
        }
    }

    _.each(methodsFiles, function(file){
        if(/\.js$/.test(file)){
            _.each(require([__dirname, "methods", file].join("/")).methods(object.options), function(method, method_name){
                object[method_name] = method;
            });
        }
    });

    return object;
}
