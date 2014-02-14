// import dependencies
var fs = require("fs");
var ChefApi = require("./chef-api");
var pkg = require("./package");

exports = module.exports = function(){
    var object = ChefApi.getObject();
    object.version = pkg.version;
    return object;
}
