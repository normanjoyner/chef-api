// import dependencies
var fs = require("fs");
var ChefApi = require("./chef-api");

exports = module.exports = function(){
    var object = ChefApi.getObject();
    object.version = "0.3.0";
    return object;
}
