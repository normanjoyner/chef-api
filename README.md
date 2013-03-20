chef-api
====================

##About

###Description
A nodejs implementation to provide simple access the chef server api

###Author
Norman Joyner - norman.joyner@gmail.com

##Getting Started

###Installation
```
npm install chef-api
```

###Utilization

Example usage with hosted chef server:
```javascript
var chef = require("chef-api");

var options = {
    username: "myusername",
    key: "/Users/myusername/.chef/myusername.pem",
    organization: "myorganization"
}

chef.config(options);

chef.getNodes(function(err, res){
    console.log(err);
    console.log(res);
});
```

Example usage with private chef server:
```javascript
var chef = require("chef-api");

var options = {
    username: "chefclientname",
    key: "/etc/chef/chefclientname.pem",
    url: "https://mychefserver.com:4000"
}

chef.config(options);

chef.getNode("mynode.fqdn", function(err, res){
    if(err)
        throw err;

    console.log(res);
});
```
