// import dependencies
var request = require('request');
var url = require('url');
var crypto = require('crypto');
var exec = require('child_process').exec;

var organization = null;
var host_url = null; 
var user = null;
var key = null;

exports.config = function(options) {
    user = options.username,
    key = options.key, 
    host_url = ["https://api.opscode.com/organizations", options.organization].join("/")
}

var http_methods = {

    get: function(uri, qs, fn){
        operations.request(uri, qs, null, "GET", function(err, response){
            if(response.error){
                err = new Error(response.error);
                response = null;
            }

            fn(err, response);
        });
    }

}

var operations = {

    sign: function(uri, body, method, fn){
        var timestamp = new Date().toISOString().replace(/\....Z/, "Z");
        var hashedPath = operations.sha(url.parse(uri).path);
        var hash = operations.sha((body ? JSON.stringify(body) : ''));
        var canonicalRequest = "Method:" + method + "\\nHashed Path:" + hashedPath + "\\nX-Ops-Content-Hash:" + hash + "\\nX-Ops-Timestamp:" + timestamp + "\\nX-Ops-UserId:" + user;
        exec("printf '" + canonicalRequest + "' | openssl rsautl -sign -inkey " + key + " | openssl enc -base64", function(err, stdout){
            var h, headers, i, signature, _i, _len, _ref1;
            var signature = stdout.replace(/\s+/g, '');
            headers = {
                "Accept": "application/json",
                "X-Ops-Timestamp": timestamp,
                "X-Ops-UserId": user,
                "X-Ops-Content-Hash": hash,
                "X-Chef-Version": "0.10.4",
                "X-Ops-Sign": "version=1.0"
            };
            _ref1 = signature.match(/.{1,60}/g);
            for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
                h = _ref1[i];
                headers["X-Ops-Authorization-" + (i + 1)] = h;
            }

            return fn(headers);
        });
    },

    sha: function(str){
        var sum;
        sum = crypto.createHash('sha1');
        sum.update(str);
        return sum.digest('base64');
    },

    request: function(url, qs, body, method, fn){
        operations.sign(url, body, method, function(headers){

            var data = {
                url: url,
                method: method,
                headers: headers
            }

            if(qs)
                data.qs = qs;

            request(data, function(err, response){
                if(err)
                    return fn(err, null);
                else
                    return fn(null, JSON.parse(response.body));
            });

        });
    }

}

exports.getNodes = function(fn){
    http_methods.get([host_url, "nodes"].join("/"), null, function(err, response){
        fn(err, response);
    });
}

exports.getNode = function(node, fn){
    http_methods.get([host_url, "nodes", node].join("/"), null, function(err, response){
        fn(err, response);
    });
}

exports.getNodeCookbooks = function(node, fn){
    http_methods.get([host_url, "nodes", node, "cookbooks"].join("/"), null, function(err, response){
        fn(err, response);
    });
}

exports.getDataBags = function(fn){
    http_methods.get([host_url, "data"].join("/"), null, function(err, response){
        fn(err, response);
    });
}

exports.getDataBag = function(databag, fn){
    http_methods.get([host_url, "data",  databag].join("/"), null, function(err, response){
        fn(err, response);
    });
}

exports.getDataBagItem = function(databag, item, fn){
    http_methods.get([host_url, "data",  databag, item].join("/"), null, function(err, response){
        fn(err, response);
    });
}

exports.getClients = function(fn){
    http_methods.get([host_url, "clients"].join("/"), null, function(err, response){
        fn(err, response);
    });
}

exports.getClient = function(client, fn){
    http_methods.get([host_url, "clients", client].join("/"), null, function(err, response){
        fn(err, response);
    });
}

exports.getCookbooks = function(fn){
    http_methods.get([host_url, "cookbooks"].join("/"), null, function(err, response){
        fn(err, response);
    });
}

exports.getCookbook = function(cookbook, fn){
    http_methods.get([host_url, "cookbooks", cookbook].join("/"), null, function(err, response){
        fn(err, response);
    });
}

exports.getCookbookVersion = function(cookbook, version, fn){
    http_methods.get([host_url, "cookbooks", cookbook, version].join("/"), null, function(err, response){
        fn(err, response);
    });
}

exports.getRoles = function(fn){
    http_methods.get([host_url, "roles"].join("/"), null, function(err, response){
        fn(err, response);
    });
}

exports.getRole = function(role, fn){
    http_methods.get([host_url, "roles", role].join("/"), null, function(err, response){
        fn(err, response);
    });
}

exports.getEnvironments = function(fn){
    http_methods.get([host_url, "environments"].join("/"), null, function(err, response){
        fn(err, response);
    });
} 

exports.getEnvironment = function(environment, fn){
    http_methods.get([host_url, "environments", environment].join("/"), null, function(err, response){
        fn(err, response);
    });
} 

exports.getEnvironmentCookbooks = function(environment, fn){
    http_methods.get([host_url, "environments", environment, "cookbooks"].join("/"), null, function(err, response){
        fn(err, response);
    });
}

exports.getEnvironmentCookbook = function(environment, cookbook, fn){
    http_methods.get([host_url, "environments", environment, "cookbooks", cookbook].join("/"), null, function(err, response){
        fn(err, response);
    });
} 

exports.getSearch = function(fn){
    http_methods.get([host_url, "search"].join("/"), null, function(err, response){
        fn(err, response);
    });
} 

exports.getSearchIndex = function(index, qs, fn){
    http_methods.get([host_url, "search", index].join("/"), qs, function(err, response){
        fn(err, response);
    });
} 
