chef-api
====================

##About

###Description
A simple client providing access the chef server api, implemented in nodejs

###Author
Norman Joyner - norman.joyner@gmail.com

##Getting Started

###Installation
```
npm install chef-api
```

###Configuration

Simply require the chef-api module, instantiate a new object, and call the ```.config()``` method to start accessing the Chef API.

The object passed to the ```.config()``` method should be configured as follows:
```javascript

var options = {
    user_name: "myusername", // (required unless using 'client_name') a chef user
    client_name: "myclientname", // (required unless using 'user_name') a chef client
    key_path: "/Users/myusername/.chef/myusername.pem", // (required unless using 'key') path to private key
    key: "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----", // (required unless using 'key_path') contents of private key
    organization: "myorganization", // (required unless using 'url') organization name for use with hosted chef
    url: "https://mychefserver.com:4000", // (required unless using 'organization') url for use with private chef server
    ca: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----", // (optional) if this key is omitted, then the default CA chain will be used. If null, the client will operate unsafely and not validate the server's certificate, it set to a certificate list explicitly, that list will be used as the CA chain.
}

chef.config(options);
```

You are now free to make API calls.

###Examples

Example usage with hosted chef server, accessing API using a user's pem path:
```javascript
var ChefApi = require("chef-api");
var chef = new ChefApi();

var options = {
    user_name: "myusername",
    key_path: "/Users/myusername/.chef/myusername.pem",
    organization: "myorganization"
}

chef.config(options);

chef.getNodes(function(err, res){
    if(err)
        throw err;

    console.log(res);
});
```

Example usage with private chef server, accessing API using a client's pem contents:
```javascript
var ChefApi = require("chef-api");
var chef = new ChefApi();

var options = {
    client_name: "myclientname",
    key: "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----",
    url: "https://mychefserver.com:4000"
}

chef.config(options);

chef.getNode("mynodes.fqdn", function(err, res){
    if(err)
        throw err;

    console.log(res);
});
```

###API Methods

chef-api provides a high level abstraction from the Chef Server API. Please consult the official docs at http://docs.opscode.com/api_chef_server.html for API specifics.
