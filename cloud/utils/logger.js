/**
 * Created by en17682 on 4/4/2014.
 */
var winston = require('winston');
exports.getLogger = getLogger;

function getLogger(pfx){
  return new Logger(pfx);

}

function Logger(prefix) {
  this.prefix = prefix || '';
  this.logger = new winston.Logger();
  this.logger.add(winston.transports.Console, {
    timestamp: true,
    colorize: true,
    level: 'silly'
  });
}

function log(prefix, str) {
  return prefix + ': ' + str.toString();
}

Logger.prototype.info = function(str) {
  this.logger.info(log(this.prefix, str));
};

Logger.prototype.warn = function(str) {
  this.logger.warn(log(this.prefix, str));
};

Logger.prototype.error = function(str) {
  this.logger.error(log(this.prefix, str));
};

Logger.prototype.err = Logger.prototype.error;

Logger.prototype.silly = function(str) {
  this.logger.silly(log(this.prefix, str));
};
