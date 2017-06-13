'use strict';

var duo = require('duo_web'),
    mongoose = require('mongoose'),
    config = require('../../config/config.js'),
    validator = require('../../config/validator.js'),
    jwt = require('jsonwebtoken'),
    User = mongoose.model('User'),
    Role = mongoose.model('Role');

module.exports = {
    login: login,
    loginCheck: loginCheck,
    logOut: logOut
};

/**
 * [login Check credentials and login user ]
 * @param  {object} req
 * @param  {object} res
 * @return {json}
 */
function login(req, res) {
    var body = req.body;
    var email = body.email;
    var password = body.password;
    var jwtToken = null;

    User.findOne({
            email: email
        })
        .exec(function(err, user) {
            if (err || !user) {
                res.json({
                    'code': config.httpUnauthorize,
                    'message': 'Invalid email or password'
                });
            } else if (!user.validPassword(password)) {
                res.json({
                    'code': config.httpUnauthorize,
                    'message': 'Invalid email or password'
                });
            /*} else if (user.group_id.name !== 'admin') {
                res.json({
                    'code': config.httpUnauthorize,
                    'message': 'Unauthorized access'
                });*/
            } else {
                //user is valid
                var expirationDuration = 60 * 60 * 24 * 1; // expiration duration 1 day.
                var params = {
                    id: user._id,
                    type: 'admin'
                }
                jwtToken = jwt.sign(params, config.SECRET, {
                    expiresIn: expirationDuration
                });
                if (validator.isValid(jwtToken)) {
                    user.duoToken = jwtToken;
                    user.duoVerified = true;
                    user.save(function(err, result) {
                        if (err) {
                            res.json({
                                'code': config.httpBadRequest,
                                'message': 'Something went wrong please try again!'
                            });
                        } else {
                            var data = {
                                token: 'Bearer ' + jwtToken
                            };
                            res.json({
                                'code': config.httpSuccess,
                                'data': data,
                                'message': 'login successfully'
                            });
                        }
                    });
                } else {
                    res.json({
                        'code': config.httpUnauthorize,
                        'message': 'Something went wrong please try again!'
                    });
                }
            }
        });
}

/**
 * [register To register user, with encrypt password ]
 * @param  {object} req
 * @param  {object} res
 * @return {json}
 */
function register(req, res) {
    var body = req.body;
    if (!validator.isValid(body.username) || !validator.isValid(body.password) || !validator.isValid(body.name) || !validator.isValid(body.email)) {
        res.json({
            'code': config.httpUnauthorize,
            'message': 'Required fields are missing'
        });
    } else {
        User.existCheck(body.username, body.email, '', function(err, exist) {
            if (err) {
                res.json({
                    'code': config.httpUnauthorize,
                    'message': 'Something went wrong please try again!'
                });
            } else {
                if (exist) {
                    res.json({
                        'code': config.httpUnauthorize,
                        'message': 'Username or email already exist please try another!'
                    });
                } else {
                 Group.findOne({ name: 'admin', deleted: false, status: true }, function(err, group) {   
                    var user = new User();
                    user.username = body.username;
                    user.name = body.name;
                    user.email = body.email;
                    user.group_id = group._id;
                    user.phone = body.phone;
                    user.setPassword(body.password);

                    user.save(function(err) {
                        if (err) {
                            res.json({
                                'code': config.httpUnauthorize,
                                'message': 'Unable to save user'
                            });
                        } else {
                            res.json({
                                'code': config.httpSuccess,
                                'message': 'User saved successfully'
                            });
                        }
                    });
                })
                }
            }
        });
    }
}



/**
 * To check logged in user
 * @param  {object} req
 * @param  {Object} res
 * @return {config.httpSuccess or config.httpUnauthorize}
 */
function loginCheck(req, res) {
    if (validator.isValid(req.headers) && (validator.isValid(req.headers.authorization || validator.isValid(req.query.api_key)))) {
        var bearer = req.headers.authorization !== undefined ? req.headers.authorization.split(' ') : req.query.api_key.split(' ');

        var bearerToken = bearer[1];
        jwt.verify(bearerToken, config.SECRET, function(err, decoded) {
            req.user = decoded;
            if (err) {
                res.json({
                    'code': config.httpUnauthorize,
                    'message': 'Your Session Expired, Please login Again.'
                });
                //logOut(bearer, res) ;
                //return res.send({ code: config.httpUnauthorize, message: 'Invalid Token!' });
            } else {
                if (bearer.length == 2) {
                    User.findOne({
                            duoToken: bearer[1]
                        }).populate({
                            path: 'group_id',
                            select: 'name'
                        })
                        .exec(function(err, user) {
                            if (err || !user) {
                                res.json({
                                    'code': config.httpUnauthorize,
                                    'message': 'Authentication failed',
                                    'data': user
                                });
                            } else {
                                res.json({
                                    'code': config.httpSuccess,
                                    'message': 'Authenticated',
                                    'data': user
                                });
                            }
                        });
                } else {
                    res.json({
                        'code': config.httpUnauthorize,
                        'message': 'Authentication failed'
                    });
                }

            }
        });
    } else {
        res.json({
            'code': config.httpUnauthorize,
            'message': 'Authentication failed'
        });
    }
};

/**
 * To logout
 * @param  {object} req
 * @param  {Object} res
 * @return {config.httpSuccess or config.httpUnauthorize}
 */
function logOut(req, res) {
    if (validator.isValid(req.headers) && (validator.isValid(req.headers.authorization || validator.isValid(req.query.api_key)))) {
        var parts = req.headers.authorization !== undefined ? req.headers.authorization.split(' ') : req.query.api_key.split(' ');
        if (parts.length == 2) {
            console.log(parts[1]);
            User.findOne({
                duoToken: parts[1],
                duoVerified: true
            }, function(err, user) {
                
                if (err) {
                    res.json({
                        'code': config.httpUnauthorize,
                        'message': 'Authentication failed'
                    });
                } else if (user) {
                    user.duoToken = '';
                    user.duoVerified = false;
                    user.save(function(err, data) {
                        if (err) {
                            res.json({
                                'code': config.httpUnauthorize,
                                'message': 'Authentication failed'
                            });
                        } else {
                            res.json({
                                'code': config.httpSuccess,
                                'message': 'Logout successfully'
                            });
                        }
                    });
                } else {
                    res.json({
                        'code': config.httpUnauthorize,
                        'message': 'Authentication failed'
                    });
                }
            });
        } else {
            res.json({
                'code': config.httpUnauthorize,
                'message': 'Authentication failed'
            });
        }
    } else {
        res.json({
            'code': config.httpUnauthorize,
            'message': 'Authentication failed1'
        });
    }
};
