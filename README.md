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
