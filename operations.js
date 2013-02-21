// import dependencies
var request = require('request');
var url = require('url');
var crypto = require('crypto');
var exec = require('child_process').exec;
var config = require([__dirname, "config"].join("/")).options;

var operations = {

    sign: function(uri, body, method, fn){
        var timestamp = new Date().toISOString().replace(/\....Z/, "Z");
        var hashedPath = operations.sha(url.parse(uri).path);
        var hash = operations.sha((body ? JSON.stringify(body) : ''));
        var canonicalRequest = "Method:" + method + "\\nHashed Path:" + hashedPath + "\\nX-Ops-Content-Hash:" + hash + "\\nX-Ops-Timestamp:" + timestamp + "\\nX-Ops-UserId:" + config.user;
        exec("printf '" + canonicalRequest + "' | openssl rsautl -sign -inkey " + config.key + " | openssl enc -base64", function(err, stdout){
            var h, headers, i, signature, _i, _len, _ref1;
            var signature = stdout.replace(/\s+/g, '');
            headers = {
                "Accept": "application/json",
                "X-Ops-Timestamp": timestamp,
                "X-Ops-UserId": config.user,
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

            if(body){
                data.body = JSON.stringify(body);
                data.headers['Content-type'] = "application/json";
            }

            request(data, function(err, response){
                if(err)
                    return fn(err, null);
                else
                    return fn(null, JSON.parse(response.body));
            });

        });
    }

}

exports.operations = operations;
