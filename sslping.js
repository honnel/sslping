var request = require("request")

var url_first_visit = "https://api.dev.ssllabs.com/api/fa78d5a4/analyze?host=honnel.de&clearCache=off&all=done"
var url_second_visit = "https://api.dev.ssllabs.com/api/fa78d5a4/analyze?host=honnel.de"

request({
        url: url_first_visit,
        json: true
    }, function (error, response, body) {
    
        if (!error && response.statusCode === 200) {
            console.log(body) // Print the json response
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