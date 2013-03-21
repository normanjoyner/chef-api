// import dependencies
var fs = require("fs");
var request = require('request');
var url = require('url');
var crypto = require('crypto');
var exec = require('child_process').exec;
var _ = require("underscore");
var key = require('ursa').coercePrivateKey;
var config = require([__dirname, "config"].join("/")).options;

var operations = {

    sign: function(uri, body, method, fn){
        var timestamp = new Date().toISOString().replace(/\....Z/, "Z");
        var hashedPath = operations.sha(url.parse(uri).path);
        var hash = operations.sha((body ? JSON.stringify(body) : ""));

        var request_headers = {
            "Method": method,
            "Hashed Path": hashedPath,
            "X-Ops-Content-Hash": hash,
            "X-Ops-Timestamp": timestamp,
            "X-Ops-UserId": config.user
        }

        var request_headers = _.map(_.pairs(request_headers), function(header){
            return header.join(":");
        }).join("\n");

        fs.readFile(config.key, function(err, key_contents){
            var signature = key(key_contents).privateEncrypt(request_headers, 'utf8', 'base64');

            var auth_headers = {
                "Accept": "application/json",
                "X-Ops-Timestamp": timestamp,
                "X-Ops-UserId": config.user,
                "X-Ops-Content-Hash": hash,
                "X-Chef-Version": "0.10.4",
                "X-Ops-Sign": "version=1.0"
            };

            var auth_header_count = 0;
            _.each(signature.match(/.{1,60}/g), function(signature_section){
                var name = ["X-Ops-Authorization", ++auth_header_count].join("-");
                auth_headers[name] = signature_section;
            });

            fn(auth_headers);
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
                    fn(err, null);
                else
                    fn(null, JSON.parse(response.body));
            });

        });
    }

}

exports.operations = operations;
