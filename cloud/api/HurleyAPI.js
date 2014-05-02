/**
 * Created by en17682 on 3/26/14.
 */
var hostName = process.env.BH_AT_WS_HOST; // require('../config.json').hostName;
var request = require('request').defaults({timeout: process.env.EMP_DIR_REQUEST_TIMOUT});
var logger = require('../utils/logger').getLogger('hurley_api('+ process.env.BH_ENV +') ');

/**
 * Check to see if user entered correct login credentials
 * @param {Object} params This option is passed from our client act call.
 * @param {Function} callback Callback function we call with args callback(err, response)
 **/
exports.sendPage = function(params, callback){
  //Call bhs active directory API
  var url = hostName + '/ATWebsvc/hurleypage/post';
  var options = {
    uri: url,
    method: 'POST',
    json: {
      "topager": params.toPager,
      "personrowid": params.hurleyPersonId,
      "fromname": params.fromName,
      "callbacknumber": params.callbackNum,
      "sessionid": params.hurleySessionID,
      "msgtext": params.pageTextInput

    }
  };
  request(options, function (err, response, body) {
    if(err){
      logger.err('error in sendPage, sending page to ' + options.topager + '. Error: '+ err);
      callback(err, null);
    }else{
      callback(null, body);
    }
  });
};

/**
 * Get pager status
 * @param {Object} params This option is passed from our client act call.
 * @param {Function} callback Callback function we call with args callback(err, response)
 **/
exports.getPagerStatus = function(params, callback){
  //Call bhs_corpdir API
  request(hostName + '/ATWebsvc/pager/getPagerStatus?par1=' + params.pagerNum, function(err, res, body){
    if(err){
      logger.err('error in getPagerStatus, getting pager status for ' + params.pagerNum + '. Error: '+ err);
      callback(err, null);
    }else{
      return callback(null, body);
    }
  });
};