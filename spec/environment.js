var ChefApi = require('../main.js'),
    chef = new ChefApi(),
    options = {
        user_name: USER,
        key_path: PATH/TO/KEY,
        organization: ORGANISATION
    },
    assert = require('assert');

chef.config(options);

describe('environments', function(){
    it('should get all nodes in the environment', function(done){
        chef.getEnvironmentNodes(ENVIRONMENT, function(err, nodes){
            if(err) throw err;
            console.log(nodes);
            assert.ok(nodes);
            done();
        });
    });
});
