##Below is a list of available methods:

###Clients
```javascript
    chef.getClients(function(err, clients){
    });
```
```javascript
    chef.getClient("client_name", function(err, client){
    });
```
```javascript
    chef.editClient("client_name", {"body": "data"}, function(err, client){
    });
```

###Cookbooks
```javascript
    chef.getCookbooks(function(err, cookbooks){
    });
```
```javascript
    chef.getCookbook("cookbook_name", function(err, cookbook){
    });
```
```javascript
    chef.getCookbookVersion("coobook_name", "0.0.0", function(err, cookbook){
    });
```
```javascript
    chef.editCookbookVersion("cookbook_name", "0.0.0", {"body": "data"}, function(err, cookbook){
    });
```
```javascript
    chef.deleteCookbookVersion("cookbook_name", "0.0.0", function(err, cookbook){
    });
```

###Data Bags
```javascript
    chef.getDataBags(function(err, data_bags){
    });
```
```javascript
    chef.getDataBag("data_bag_name", function(err, data_bag){
    });
```
```javascript
    chef.getDataBagItem("data_bag_name", "item_name", function(err, data_bag_item){
    });
```
```javascript
    chef.getDataBagItem("data_bag_name", "item_name", {"body": "data"}, function(err, data_bag_item){
    });
```
```javascript
    chef.createDataBag({"body": "data"}, function(err, data_bags){
    });
```
```javascript
    chef.createDataBagItem("data_bag_name", {"body": "data"}, function(err, data_bags){
    });
```
```javascript
    chef.deleteDataBagItem("data_bag_name", "item_name", function(err, data_bags){
