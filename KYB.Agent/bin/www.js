/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
/**
 *  依赖加载
 * */
var app = require('../app').app
  , debug = require('debug')('kyb_server')
  , http = require('http')
  , cluster = require('cluster')//使用多线程模块
  , config = require('../config/config')[process.env.NODE_ENV || "development"];
var Logger = require('../utils/logger/log4js').Logger;

//设置项目进程数量
var numCPUs = config['system']['cpu'] || 1;

if (cluster.isMaster) {
  process.title = "kyb_server_agent";
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  //创建进程时记录进程创建
  cluster.on('fork', function (worker) {
    Logger('cluster').info('fork,     worker:' + worker.id + ',     pid:' + worker.process.pid);
  });
  //work退出是记录
  cluster.on('exit', function (worker, signal, code) {
    Logger('cluster').fatal('exit,     worker:' + worker.id + ',     pid:' + worker.process.pid + ',     signal:' + signal + ",     code:" + code);
    cluster.fork();
  });
  //work失联时记录
  //cluster.on('disconnect', function (worker) {
  //    Logger('cluster').error('worker ' + worker.id + ' disconnect')
  //    cluster.fork();
  //});
} else if (cluster.isWorker) {
  //异常处理
  process.on('uncaughtException', function (err) {
    Logger('error').error(err.stack);
    Logger('error').fatal({
      message: "---未被catch的异常---",
      error: err,
      stack: err.stack,
      message2: err.message
    })
  });
  app.set('port', process.env.PORT || config["system"]["port"]);
  var server = app.listen(app.get('port'), function () {
    Logger('cluster').info('kyb_be 启动,监听:' + app.get('port') + ' 端口,   ' + '当前环境:' + app.get('env'));
    debug('Express server listening on port ' + server.address().port);
  });
}