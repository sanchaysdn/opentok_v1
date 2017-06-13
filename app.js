'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
module.exports = app; // for testing
require('./config/db');
var utils = require('./api/lib/util');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/users')));
app.use(express.static(path.join(__dirname, 'public/admin')));


var config = {
    appRoot: __dirname // required config
};

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'public/users/index.html'));
});

app.get('/admin', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'public/admin/index.html'));
});

SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) {
        throw err;
    }


    // All api requests
    app.use(function(req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization');

        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });

    // enable SwaggerUI
    app.use(swaggerExpress.runner.swaggerTools.swaggerUi());
    // install middleware
    swaggerExpress.register(app);

    var port = process.env.PORT || 5063;
    app.listen(port);

    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://localhost:' + port + '/hello?name=Scott');
    }
});
