var request = require('request');
var rp = require('request-promise');

var loginOptions = {
    method: 'POST',
    uri: 'http://celebration.fuze-care-qa.com/login',
    body: { "Email": "vsreenath", "Password": "Abc@123" },
    json: true,
    jar: true,
};

var index = 9999;

rp(loginOptions)
    .then(function (body) {
        console.log("Login Success");
        getLedger(index);
    })
    .catch(function (error) {
        console.log(error);
    });

function getLedger(index) {
    index++;
    var options = {
        method: 'POST',
        uri: 'http://celebration.fuze-care-qa.com/patient/billing/get-group-ledger/' + index + '?isActive=true',
        body: { "Filter": {}, "PageIndex": 1, "PageSize": 30 },
        json: true,
        jar: true,
    };

    var count = 0;
    console.log("Requesting Url : ", options.uri);

    rp(options)
       .then(function (body) {           
           getLedger(index);
           // console.log(body);
       })
       .catch(function (error) {
           console.log(index);
           writeToFile(index);
           getLedger(index);          
       });
}

function writeToFile(patientID) {
    var fs = require('fs');
    fs.appendFile('error.log', patientID + '\r\n', { flag: 'a' }, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}


/*
request.post({ url: 'http://celebration.fuze-care-qa.com/login', form: { "Email": "vsreenath", "Password": "Abc@123" }, jar: true }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log("Login Success");
        for (var i = 29106; i <= 29108; i++) {

            var options = {
                method: 'POST',
                uri: 'http://celebration.fuze-care-qa.com/patient/billing/get-group-ledger/' + i + '?isActive=true',
                body: { "Filter": {}, "PageIndex": 1, "PageSize": 30 },
                json: true,
            };


            var count = 0;
            console.log("Requesting Url : ", options.uri);
            //request.post({ url: url, form: { "Filter": {}, "PageIndex": 1, "PageSize": 30 }, jar: true }, function (error, response, body) {
            //    if (!error && response.statusCode == 200) {
            //        console.log("Success");                  
            //    }
            //    else if (response && response.statusCode == 500) {
            //        console.log("Ledger Failed : ", response.statusCode);
            //        console.log(body);
            //    }
            //    else if (response) {
            //        console.log(response.statusCode);
            //    }
            //    else if (!response) {
            //        console.log("Not found! : ", error, request);
            //    }
            //    count++;
            //    showRemaining(count);
            //});

            rp(options)
                .then(function (body) {
                    console.log(body);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    else if (response && response.statusCode == 500) {
        console.log("Login Failed");
    }
    else if (response) {
        console.log(response.statusCode);
    }
    else {
        console.log(error);
    }
});
*/
function showRemaining(count) {
    console.log("Remaining - ", (30000 - count));
}
