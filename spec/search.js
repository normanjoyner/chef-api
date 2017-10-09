var ChefApi = require('../main.js'),
    chef = new ChefApi(),
    options = {
        user_name: USER,
        key_path: PATH/TO/KEY,
        organization: ORGANISATION
    },
    assert = require('assert');

chef.config(options);

describe('search', function(){
    it('should search for nodes with the role ubuntu', function(done){
        chef.search('node', "role:ubuntu", function(err, nodes){
            if(err) throw err;
            console.log(nodes);
            assert.ok(nodes);
            done();
        });
    });
});
