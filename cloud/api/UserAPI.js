/**
 * Created by en17682 on 3/25/14.
 */
var hostName = process.env.BH_AT_WS_HOST; // require('../config.json').hostName;
var request = require('request').defaults({timeout: process.env.EMP_DIR_REQUEST_TIMOUT});
var safejson = require('safejson');
var sessionMgr = require('../utils/SessionMgr');
var logger = require('../utils/logger').getLogger('user_api('+ process.env.BH_ENV +') ');

/**
 * Check to see if user entered correct login credentials
 * @param {Object} params This option is passed from our client act call.
 * @param {Function} callback Callback function we call with args callback(err, response)
 **/
exports.checkLogin = function(params, callback){
  logger.info('checking login for ' + params.username);
  //Call bhs active directory API
  if(params.username !== undefined) {
    var url = hostName + '/ATWebsvc/actdir/post';
    var options = {
      uri: url,
      method: 'POST',
      json: {
        "userid": params.username,
        "password": params.password

      }
    };
      console.log('xxx', options);
    request(options, function (err, response, body) {
      if (err) {
        logger.err('error in checkLogin response for ' + params.username + '. Details: ' + err);
        callback(err, null);
      } else {
        sessionMgr.createSession(params, function (err, token) {
          if (err) {
            callback(err, null);
          } else {
            //safejson.parse(body, function (err, json) {
            body.sessionToken = token;
            callback(err, body);
            //});
          }
        });
      }
    });

  }else{
    var err = 'Invalid credentials';
    logger.err('error in checkLogin for ' + params.username + '. Details: ' + err);
    callback(err, null);
  }
};
