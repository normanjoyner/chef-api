chef-api
====================

##About

###Description
A simple chef server api wrapper, implemented in nodejs.

###Author
Norman Joyner - norman.joyner@gmail.com

##Getting Started

###Installation
```
npm install chef-api
```

###Utilization

Simply require the chef-api and call the ```.config()``` method to start accessing the Chef API.

The object passed to the ```.config()``` method should be configured as follows:
```javascript

var options = {
    username: "myusername", // (required) can either be the username or client name
    key: "/Users/myusername/.chef/myusername.pem", // (required) path to the users pem or client pem
    organization: "myorganization", // (optional) organization name for use with hosted chef
    url: "https://mychefserver.com:4000", // (optional) url for use with private chef server
}

chef.config(options);
```

You are now free to make API calls.


###Examples

Example usage with hosted chef server:
```javascript
var chef = require("chef-api");

var options = {
    username: "username",
    key: "/Users/username/.chef/username.pem",
    organization: "organization"
}

chef.config(options);

chef.getNodes(function(err, res){
    if(err)
        throw err;

    console.log(res);
});
```

Example usage with private chef server:
```javascript
var chef = require("chef-api");

var options = {
    username: "clientname",
    key: "/etc/chef/clientname.pem",
    url: "https://mychefserver.com:4000"
}

chef.config(options);

chef.getNode("mynodes.fqdn", function(err, res){
    if(err)
        throw err;

    console.log(res);
});
```
