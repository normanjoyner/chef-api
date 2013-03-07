var opts = {
    user: "",
    key: "",
    host_url: ""
}

var config = function(options) {
    opts.user = options.username,
    opts.key = options.key, 
    opts.host_url = ["https://api.opscode.com/organizations", options.organization].join("/")
}

exports.config = config;
exports.options = opts;
