/**
 * Created by en17682 on 4/3/2014.
 */
var crypto = require('crypto');
var $fh = require('fh-api');
var safejson = require('safejson');
//TODO uncomment following line when going to prod
//var expireAfter = 24*60*60; //24 hours
var expireAfter =  process.env.EMP_DIR_SESSN_EXPIRE_AFTER; //24*60*60; //24 hours
var logger = require('../utils/logger').getLogger('session_mgr('+ process.env.BH_ENV +') ');


function createToken(deviceId){
  var hash = crypto.createHash('sha1');
  hash.update(deviceId + Math.random());
  return hash.digest('hex');
}

exports.createSession = function(params, callback){
  var token = createToken(params.__fh.cuid);
  safejson.stringify({deviceId: params.__fh.cuid}, function(err, str){
    if(err){
      logger.err('error creating session for ' + params.username);
      callback(err, null);
    }else {
      logger.info('Creating session for ' + params.username);
      $fh.session.set(token, str, expireAfter, callback);
    }
  });

};

exports.validateSession = function (sessionToken, deviceId, callback){
  $fh.session.get(sessionToken, function(err, sessionData){
    if(err){
      logger.err('error validating session for device: ' + deviceId);
      callback(err, null);
    }else if(!sessionData){
      callback(null, false);
    }else{
      safejson.parse(sessionData, function(err, json) {
        if(err){
          logger.err('error parsing session data token: ' + sessionToken);
          callback(err, null);
        }else {
          if(json.deviceId === deviceId){
            logger.info('session valid for device ' + deviceId);
            callback(null, true);
          }else{
            callback(null, false);
            logger.info('session invalid for device ' + deviceId);
          }
        }
      });

    }
  });
};

exports.removeSession = function(params, callback){
  $fh.session.remove(params.sessionId, callback);
};

exports.checkSession = function(params, callback){
    if(typeof params.sessionToken !== 'string'){
      callback(null, {valid: false});
    }else {
      exports.validateSession(params.sessionToken, params.__fh.cuid, function (err, isValid) {
        if (err) {
          callback(err, null);
        } else if (!isValid) {
          callback(null, {valid: false});
        } else {
          callback(null, {valid: true});
        }
      });
    }
};

exports.addValidatedEndpoint = function(fn){

  //to bypass validation - mj
  //return fn
  
  return function(params, callback){
    if(typeof params.sessionToken !== 'string'){
      callback(null, {valid: false});
    }else {
      exports.validateSession(params.sessionToken, params.__fh.cuid, function (err, isValid) {
        if (err) {
          callback(err, null);
        } else if (!isValid) {
          callback(null, {valid: false});
        } else {
          fn(params, callback);
        }
      });
    }
  }
};