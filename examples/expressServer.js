var express = require('express');
var snapsearch = require('snapsearch-client-nodejs');

var app = express();

app.use(snapsearch.connect(
    new snapsearch.Interceptor(
        new snapsearch.Client('EMAIL', 'KEY', {}, function (error, debugging) {
                //custom exception handler for Client errors such as HTTP errors or validation errors from the API
                console.log(error);
                console.log(debugging);
        }),
        new snapsearch.Detector()
    ),
    function (data) {

        //return an object for custom response handling
        return {
            status: data.status,
            html: data.html,
            headers: data.headers
        };

    }
));

app.get('/', function (req, res) {
    res.send('Was not a robot and we are here inside app');
});

app.listen(1337);

console.log('Server running at http://127.0.0.1:1337/');