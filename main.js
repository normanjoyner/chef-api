// import dependencies
var fs = require("fs");
var ChefApi = require("./chef-api");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

exports = module.exports = function(){
    var object = ChefApi.getObject();
    object.version = "0.3.0";
    return object;
}
