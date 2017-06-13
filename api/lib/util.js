'use strict';

var jwt = require('jsonwebtoken');
var config = require('../../config/config.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = {
    ensureAuthorized: ensureAuthorized
}

/**
 * [ensureAuthorized - ensure Authorized users ]
 * @param  {object} req
 * @param  {object} res
 * @return {json}
 */
function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"] || req.query["api_key"];

    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(bearerToken, config.SECRET, function(err, decoded) {
            console.log('decoded',decoded);
            req.user = decoded;
            if (err) {
                return res.send({ code: config.httpUnauthorize, message: 'Invalid Token!' });
            } else {
                User.findOne({ _id: req.user.id, status: 'Active' }, function(err, user) {
                    if (user) {
                        next();
                    } else {
                        return res.send({ code: config.httpUnauthorize, message: 'Unauthorized access' });
                    }
                })
            }
            //next();
        });
    } else {
        return res.send({ code: config.httpUnauthorize, message: 'Please provide valid Authentication Token!' });
    }
}
