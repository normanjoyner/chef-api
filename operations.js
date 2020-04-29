var fs = require("fs");
var request = require('request');
var url = require('url');
var crypto = require('crypto');
var exec = require('child_process').exec;
var _ = require("lodash");

exports.operations = function(config){
    return {
        sign: function(uri, body, method, fn){
            var timestamp = new Date().toISOString().replace(/\....Z/, "Z");
            var hashedPath = this.sha(url.parse(uri).path);
            var hash = this.sha((body ? JSON.stringify(body) : ""));

            var request_headers = {
                "Method": method,
                "Hashed Path": hashedPath,
                "X-Ops-Content-Hash": hash,
                "X-Ops-Timestamp": timestamp,
                "X-Ops-UserId": config.name
            }

            var request_headers = _.map(_.pairs(request_headers), function(header){
                return header.join(":");
            }).join("\n");

            var signature = crypto
                .privateEncrypt(config.key_contents, Buffer.from(request_headers))
                .toString("base64");

            var auth_headers = {
                "Accept": "application/json",
                "X-Ops-Timestamp": timestamp,
                "X-Ops-UserId": config.name,
                "X-Ops-Content-Hash": hash,
                "X-Chef-Version": "0.10.4",
                "X-Ops-Sign": "version=1.0"
            };

            var auth_header_count = 0;
            _.each(signature.match(/.{1,60}/g), function(signature_section){
                var name = ["X-Ops-Authorization", ++auth_header_count].join("-");
                auth_headers[name] = signature_section;
            });

            return fn(auth_headers);
        },

        sha: function(str){
            var sum;
            sum = crypto.createHash('sha1');
            sum.update(str);
            return sum.digest('base64');
        },

        request: function(url, qs, body, method, fn){
            this.sign(url, body, method, function(headers){

                var data = {
                    url: url,
                    method: method,
                    headers: headers,
                    qs: qs || {}
                }

                if(config.hasOwnProperty('ca')) {
                    if(config.ca === null) {
                        data.strictSSL = false;
                        data.rejectUnauthorized = false;
                    }
                    else
                        data.ca = config.ca;
                }

                if(config.hasOwnProperty('timeout')) {
                    data.timeout = config.timeout
                }

                if(body){
                    data.body = JSON.stringify(body);
                    data.headers['Content-type'] = "application/json";
                }

                request(data, function(err, response){
                    if (response) {
                        if(response.statusCode >= 200 && response.statusCode <= 206){
                            try{
                                var err = null;
                                var body = JSON.parse(response.body);
                            }
                            catch(e){
                                var err = new Error("Cannot parse response body");
                                var body = null;
                            }
                            return fn(err, body);
                        }
                        else{
                            var message = ["Received status code:", response.statusCode].join(" ");
                            try{
                                var body = JSON.parse(response.body);
                                if(_.has(body, "error"))
                                    message = [message, body.error].join(" - ");

                                var err = new Error(message);
                            }
                            catch(e){
                                var err = new Error(message);
                            }

                            return fn(err, null)
                        }
                    }
                    else {
                      return fn(err, null);
                    }
                });
            });
        }
    }
}
