/*
* This small nodejs app uses the api of ssllabs for getting ssl information of an given host
* All API Calls can be found at: https://github.com/ssllabs/ssllabs-scan/blob/master/ssllabs-api-docs.md
* Usage: node sslping.js domain.tld
*/
var request = require("request")

var host = process.argv[2];
var url_first_visit = "https://api.dev.ssllabs.com/api/fa78d5a4/analyze?host=" + host +"&clearCache=on&all=done"
var url_second_visit = "https://api.dev.ssllabs.com/api/fa78d5a4/analyze?host=" + host

request({
        url: url_first_visit,
        json: true
    }, function (error, response, body) {
    
        if (!error && response.statusCode === 200) {
            console.log(body)
        }
    })

setInterval(function() {
    request({
            url: url_second_visit,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                if (body.status == 'IN_PROGRESS') {
                    var progress = ((body.endpoints[0].progress == -1) ? 0 : body.endpoints[0].progress)
                    console.log("[" + progress + "/100%] " + body.endpoints[0].statusMessage + " (" + body.endpoints[0].statusDetailsMessage + ")...")
                } else if (body.status == 'READY') {
                    console.log(body.endpoints[0].grade)
                }
            }
        })
}, 1000);