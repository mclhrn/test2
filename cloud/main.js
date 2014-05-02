//customize app cloud logic, all the public functions defined here will be accessible using the url:
//http://<host>/cloud/<function name>
'use strict';

var userApi = require('./api/UserAPI');
var corpDirApi = require('./api/CorpDirAPI');
var hurleyApi = require('./api/HurleyAPI');
var sessionMgr = require('./utils/SessionMgr');
//var ad = require('activedirectory');

/**
 * Get all employees by last name
 * @param {Object} params This option is passed from our client act call.
 * @param {Function} callback Callback function we call with args callback(err, response)
 **/
exports.getByLast = sessionMgr.addValidatedEndpoint(corpDirApi.getByLast);

/**
 * Get all employees by last and first name
 * @param {Object} params This option is passed from our client act call.
 * @param {Function} callback Callback function we call with args callback(err, response)
 **/
exports.getByLastFirst = sessionMgr.addValidatedEndpoint(corpDirApi.getByLastFirst);

/**
 * Get employee by employee number
 * @param {Object} params This option is passed from our client act call.
 * @param {Function} callback Callback function we call with args callback(err, response)
 **/
exports.getByEn = sessionMgr.addValidatedEndpoint(corpDirApi.getByEn);

/**
 * Check to see if user entered correct login credentials
 * @param {Object} params This option is passed from our client act call.
 * @param {Function} callback Callback function we call with args callback(err, response)
 **/
exports.checkLogin = userApi.checkLogin;

/**
 * Check to see if client session is valid
 * @param {Object} params This option is passed from our client act call.
 * @param {Function} callback Callback function we call with args callback(err, response)
 **/
exports.checkSession = sessionMgr.checkSession;

/**
 * Send a page to a pager
 * @param {Object} params This option is passed from our client act call.
 * @param {Function} callback Callback function we call with args callback(err, response)
 **/
exports.sendPage = sessionMgr.addValidatedEndpoint(hurleyApi.sendPage);

/**
 * Get pager status
 * @param {Object} params This option is passed from our client act call.
 * @param {Function} callback Callback function we call with args callback(err, response)
 **/
exports.getPagerStatus = sessionMgr.addValidatedEndpoint(hurleyApi.getPagerStatus);