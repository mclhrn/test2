/**
 * Created by en17682 on 3/26/14.
 */
var hostName = process.env.BH_AT_WS_HOST; // require('../config.json').hostName;
var request = require('request').defaults({timeout: process.env.EMP_DIR_REQUEST_TIMOUT});
var logger = require('../utils/logger').getLogger('corp_dir_api('+ process.env.BH_ENV +') ');

/**
 * Get all employees by last name
 * @param {Object} params This option is passed from our client act call.
 * @param {Function} callback Callback function we call with args callback(err, response)
 **/
exports.getByLast = function(params, callback){
  var searchStr = params.key;
  //Call bhs_corpdir API
  request(hostName + '/ATWebsvc/corpdir/getByLast?par1=' + searchStr, function(err, res, body){
    if(err){
      logger.err('error in getByLast, searching for ' + searchStr + '. Error: '+ err);
      callback(err, null);
    }else{
      callback(null, body);
    }
  });
};

/**
 * Get all employees by last name
 * @param {Object} params This option is passed from our client act call.
 * @param {Function} callback Callback function we call with args callback(err, response)
 **/
exports.getByLastFirst = function(params, callback){
  var name = params.name;
  var url = hostName + '/ATWebsvc/corpdir/getByLastFirst?par1=' + name.last + '&par2=' + name.first;
  //Call bhs_corpdir API
  request(url, function(err, res, body){
    if(err){
      logger.err('error in getByLastFirst, searching for ' + name + '. Error: '+ err);
      callback(err, null);
    }else{
      callback(null, body);
    }
  });
};

/**
 * Get employee by employee number
 * @param {Object} params This option is passed from our client act call.
 * @param {Function} callback Callback function we call with args callback(err, response)
 **/
exports.getByEn = function(params, callback){
  //Call bhs_corpdir API
  request(hostName + '/ATWebsvc/corpdir/getByEn?par1=' + params.empNum, function(err, res, body){
    if(err){
      logger.err('error in getByEn, searching for ' + params.empNum + '. Error: '+ err);
      callback(err, null);
    }else{
      callback(null, body);
    }
  });
};