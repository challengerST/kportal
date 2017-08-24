/**
 * Created by Jeremy on 2016/11/20.
 */
var log4js = require('log4js')
    , path = require('path')
    , env = process.env.NODE_ENV || "development"
    , config = require(path.join(__dirname, '../../config/log4js'))[env]['log4js'];

log4js.configure(config);

module.exports.Logger = function (name) {
    var logger = log4js.getLogger(name);
    logger.setLevel("info");
    return logger;
};