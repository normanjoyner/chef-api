// import dependencies
var _ = require("underscore");
var fs = require("fs");

var availableMethods = [];
var methodsFiles = fs.readdirSync([__dirname, "methods"].join("/"));

_.each(methodsFiles, function(file){
    if(/\.js$/.test(file))
        availableMethods.push(require([__dirname, "methods", file].join("/")).methods);
});

_.each(availableMethods, function(methods){
    _.each(_.keys(methods), function(method){
        exports[method] = methods[method];
    });
});

exports.config = require([__dirname, "config"].join("/")).config;

