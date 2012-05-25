request = require 'request'
url     = require 'url'
crypto  = require 'crypto'
fs      = require 'fs'
exec    = require('child_process').exec


user = null
key = null

sha = (str) ->
  sum = crypto.createHash 'sha1'
  sum.update str
  sum.digest 'base64'

exports.auth = (myUser, pem) ->
  user = myUser
  key = pem

exports.request = (uri, body, cb) ->
  [body, cb] = [undefined, body] unless cb?

  if body then method = "POST" else method = "GET"
  
  timestamp = new Date().toISOString().replace(/\....Z/,"Z") #Shave off the milliseconds
  hashedPath = sha url.parse(uri).path
  hash = sha (if body then JSON.stringify body else '')

  canonicalRequest = "Method:#{method}\\nHashed Path:#{hashedPath}\\nX-Ops-Content-Hash:#{hash}\\nX-Ops-Timestamp:#{timestamp}\\nX-Ops-UserId:#{user}"

  exec "printf '#{canonicalRequest}' | openssl rsautl -sign -inkey #{key} | openssl enc -base64", (e, stdout) ->

    signature = stdout.replace /\s+/g, ''

    headers = {
      "Accept":             "application/json"
      "X-Ops-Timestamp":    timestamp
      "X-Ops-UserId":       user
      "X-Ops-Content-Hash": hash
      "X-Chef-Version":     "0.10.4"
      "X-Ops-Sign":         "version=1.0"
    }

    for h, i in signature.match /.{1,60}/g
      headers["X-Ops-Authorization-#{i+1}"] = h

    request uri, {method, body, headers}, (err, resp, body) ->
      if err
        cb err
      else
        cb null, JSON.parse body
