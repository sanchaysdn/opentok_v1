'use strict';

//var Withings = require('withings-lib'),
var Withings = require('../lib/withings.js'),
config = require('../../config/config.js'),
mongoose = require('mongoose'),
Roles = mongoose.model('Role'),
User = mongoose.model('User'),
PatientDeviceConfig = mongoose.model('PatientDeviceConfig');


module.exports = {
    authRequest:authRequest,
    oauth_callback:oauth_callback,
    activity_steps:activity_steps,
    SleepSummary:SleepSummary,
    PulseMeasures:PulseMeasures,
    WeightMeasures:WeightMeasures,
    DailySteps:DailySteps,
    DailyCalories:DailyCalories,
    Steps:Steps,
    Calories:Calories
};


/**
 * [createfcst - create fcstrcos]
 * @param  {json body} req
 * @param  {object} res
 * @return {json}
 */
function authRequest(req, res) {
	var options = {
        consumerKey: config.CONSUMER_KEY,
        consumerSecret: config.CONSUMER_SECRET,
        callbackUrl: config.CALLBACK_URL
	};
	var client = new Withings(options);
	 client.getRequestToken(function (err, token, tokenSecret) {
        if (err) {
            // Throw error
            return;
        }
        req.session.oauth = {
            'requestToken': token,
            'requestTokenSecret': tokenSecret,
            'loginUserId':req.user.id
        };
        res.json({
            code: config.httpSuccess,
            url: client.authorizeUrl(token, tokenSecret),
        });
        //res.redirect(client.authorizeUrl(token, tokenSecret));
    });
}

/**
 * [createfcst - create fcstrcos]
 * @param  {json body} req
 * @param  {object} res
 * @return {json}
 */
function oauth_callback(req, res) {
    var verifier = req.query.oauth_verifier
    var oauthSettings = req.session.oauth
    var options = {
        consumerKey: config.CONSUMER_KEY,
        consumerSecret: config.CONSUMER_SECRET,
        callbackUrl: config.CALLBACK_URL,
        userID: req.query.userid
    };
    var client = new Withings(options);
    // Request an access token
    client.getAccessToken(oauthSettings.requestToken, oauthSettings.requestTokenSecret, verifier,
        function (err, token, secret) {
            if (err) {
                //error
                /*res.json({
                    code: config.httpUnauthorize,
                    message: err,
                });*/
                res.redirect('/#!/deviceList');
            }
            var postData = {
                'accessToken' : token,
                'accessTokenSecret' : secret,
                'withing_user_id' : req.query.userid,
                'patient_id':oauthSettings.loginUserId
            }
            PatientDeviceConfig.findOneAndUpdate({patient_id: oauthSettings.loginUserId}, {
                    $set: postData
                },{upsert:true},function (err, data) {
                    if(err){
                        res.redirect('/#!/deviceList');
                        /*res.json({
                            'code': config.httpUnauthorize,
                            'message': 'Something went wrong please try again!',
                            'error':err
                        });*/
                    }else{
                        /*res.json({
                            'code': config.httpSuccess,
                            'message': 'Connected to withings successfully.',
                        });*/
                    var options = {
                        consumerKey: config.CONSUMER_KEY,
                        consumerSecret: config.CONSUMER_SECRET,
                        accessToken: token,
                        accessTokenSecret: secret,
                        //userID: req.query.userid
                        userID: req.query.userid
                    };
                    //console.log('options',options);
                    var client = new Withings(options);
                    client.getWeightMeasures('2017-01-01','2017-06-10', function(err, data) { // working
                        if (err) {
                            res.send(err);    
                        }
                        console.log('WeightMeasures Data :::::');
                        console.log(data);
                        //res.json(data);
                    });

                    client.getPulseMeasures('2017-01-01','2017-06-10', function(err, data) { //working
                        if (err) {
                            res.send(err);    
                        }
                        console.log('PulseMeasures Data ::::');
                        console.log(data);
                    });

                        res.redirect('/#!/deviceList');
                    }
                })
        }
    );
}

/**
 * [createfcst - create fcstrcos]
 * @param  {json body} req
 * @param  {object} res
 * @return {json}
 */
function DailySteps(req, res) {
    var options = {
        consumerKey: config.CONSUMER_KEY,
        consumerSecret: config.CONSUMER_SECRET,
        accessToken: req.session.oauth.accessToken,
        accessTokenSecret: req.session.oauth.accessTokenSecret,
        //userID: req.query.userid
        userID: req.session.oauth.userid
    };
    console.log('options',options);
    var client = new Withings(options);
    client.getDailySteps('2017-06-02', function(err, data) { //working
        console.log('cntrl',data);
        if (err) {
            res.send(err);    
        }
        res.json(data);
    });
}
/**
 * [createfcst - create fcstrcos]
 * @param  {json body} req
 * @param  {object} res
 * @return {json}
 */
function Steps(req, res) {
    var options = {
        consumerKey: config.CONSUMER_KEY,
        consumerSecret: config.CONSUMER_SECRET,
        accessToken: req.session.oauth.accessToken,
        accessTokenSecret: req.session.oauth.accessTokenSecret,
        //userID: req.query.userid
        userID: req.session.oauth.userid
    };
    //console.log('options',options);
    var client = new Withings(options);
    client.getSteps('2017-05-29','2017-06-01', function(err, data) { //working
        console.log('cntrl',data);
        if (err) {
            res.send(err);    
        }
        res.json(data);
    });
}
/**
 * [createfcst - create fcstrcos]
 * @param  {json body} req
 * @param  {object} res
 * @return {json}
 */
function DailyCalories(req, res) {
    var options = {
        consumerKey: config.CONSUMER_KEY,
        consumerSecret: config.CONSUMER_SECRET,
        accessToken: req.session.oauth.accessToken,
        accessTokenSecret: req.session.oauth.accessTokenSecret,
        //userID: req.query.userid
        userID: req.session.oauth.userid
    };
    console.log('options',options);
    var client = new Withings(options);
    client.getDailyCalories('2017-06-01', function(err, data) { //working
        if (err) {
            res.send(err);  
        }
        res.json(data);
    });
}
/**
 * [createfcst - create fcstrcos]
 * @param  {json body} req
 * @param  {object} res
 * @return {json}
 */
function Calories(req, res) {
    var options = {
        consumerKey: config.CONSUMER_KEY,
        consumerSecret: config.CONSUMER_SECRET,
        accessToken: req.session.oauth.accessToken,
        accessTokenSecret: req.session.oauth.accessTokenSecret,
        //userID: req.query.userid
        userID: req.session.oauth.userid
    };
    //console.log('options',options);
    var client = new Withings(options);
    client.getCalories('2017-05-29','2017-06-01', function(err, data) { //working
        if (err) {
            res.send(err);  
        }
        res.json(data);
    });
}
/**
 * [createfcst - create fcstrcos]
 * @param  {json body} req
 * @param  {object} res
 * @return {json}
 */
function activity_steps(req, res) {
	var options = {
        consumerKey: config.CONSUMER_KEY,
        consumerSecret: config.CONSUMER_SECRET,
        accessToken: req.session.oauth.accessToken,
        accessTokenSecret: req.session.oauth.accessTokenSecret,
        //userID: req.query.userid
        userID: req.session.oauth.userid
    };
    //console.log('options',options);
    var client = new Withings(options);
    client.getSleepSummary('2017-01-01','2017-06-02', function(err, data) { //working
    //client.getPulseMeasures('2017-01-01','2017-06-02', function(err, data) { //working
    //client.getWeightMeasures('2017-01-01','2017-06-02', function(err, data) { // working
        if (err) {
            res.send(err);    
        }
        res.json(data);
    });
}

/**
 * [createfcst - create fcstrcos]
 * @param  {json body} req
 * @param  {object} res
 * @return {json}
 */
function SleepSummary(req, res) {
	var options = {
        consumerKey: config.CONSUMER_KEY,
        consumerSecret: config.CONSUMER_SECRET,
        accessToken: req.session.oauth.accessToken,
        accessTokenSecret: req.session.oauth.accessTokenSecret,
        //userID: req.query.userid
        userID: req.session.oauth.userid
    };
    //console.log('options',options);
    var client = new Withings(options);
    client.getSleepSummary('2017-01-01','2017-06-02', function(err, data) { //working
        if (err) {
            res.send(err);    
        }
        res.json(data);
    });
}
/**
 * [createfcst - create fcstrcos]
 * @param  {json body} req
 * @param  {object} res
 * @return {json}
 */
function PulseMeasures(req, res) {
	var options = {
        consumerKey: config.CONSUMER_KEY,
        consumerSecret: config.CONSUMER_SECRET,
        accessToken: req.session.oauth.accessToken,
        accessTokenSecret: req.session.oauth.accessTokenSecret,
        //userID: req.query.userid
        userID: req.session.oauth.userid
    };
    //console.log('options',options);
    var client = new Withings(options);
    //client.getSleepSummary('2017-01-01','2017-06-02', function(err, data) { //working
    client.getPulseMeasures('2017-01-01','2017-06-02', function(err, data) { //working
        if (err) {
            res.send(err);    
        }
        res.json(data);
    });
}
/**
 * [createfcst - create fcstrcos]
 * @param  {json body} req
 * @param  {object} res
 * @return {json}
 */
function WeightMeasures(req, res) {
	var options = {
        consumerKey: config.CONSUMER_KEY,
        consumerSecret: config.CONSUMER_SECRET,
        accessToken: req.session.oauth.accessToken,
        accessTokenSecret: req.session.oauth.accessTokenSecret,
        //userID: req.query.userid
        userID: req.session.oauth.userid
    };
    //console.log('options',options);
    var client = new Withings(options);
    client.getWeightMeasures('2017-01-01','2017-06-02', function(err, data) { // working
        if (err) {
            res.send(err);    
        }
        res.json(data);
    });
}