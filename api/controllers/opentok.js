var opentok = require('opentok');
var fs = require('fs');
var OpentokConfig = {
    "apiKey": "45881862",
    "apiSecret": "1245cbcf80e1a60b61717bae3c4bd098e6cbfde8"
};
var config = require('../../config/config.js');

module.exports = {
    createSession: createSession,
}

if (!OpentokConfig.apiKey || !OpentokConfig.apiSecret) {
    throw new Error('API_KEY or API_SECRET must be defined as an environment variable');
}

var opentok = new opentok(OpentokConfig.apiKey, OpentokConfig.apiSecret);
var sessionId;
var webrtcToken;

/**
 * [createSession Creating openTok session sending sessionId, webrtcToken, & apiKey to server]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function createSession(req, res) {
    opentok.createSession({
        mediaMode: "routed",
        archiveMode: 'always'
    }, function(error, session) {
        if (error) {
            res.json({
                code: config.httpUnauthorize,
                message: 'Error creating session: ' + error
            })
            throw new Error("Error creating session:" + error);
        } else {
            sessionId = session.sessionId;
            webrtcToken = opentok.generateToken(sessionId, {
                role: "publisher",
                expireTime: (new Date().getTime() / 1000) + (7 * 24 * 60 * 60), // in one week
            });


            var data = {
                sessionId: sessionId,
                webrtcToken: webrtcToken,
                apiKey: OpentokConfig.apiKey
            }

            res.json({
                code: config.httpSuccess,
                data: data
            })
        }
    });
}
