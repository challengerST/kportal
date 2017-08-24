/**
 * Created by Jeremy on 2016/11/25.
 */
"use strict";
var express = require("express")
  , requestJson = require("request-json")
  , path = require("path")
  , async = require("async")
  , config = require('../../config/config')[process.env.NODE_ENV || "development"];
/**
 * 后端请求api数据的标准接口
 * @param req
 * @param option    配置信息
 * {
        data: "请求提交的数据信息"
        , error: "请求失败时回调"
        , method: "请求方法，get/post"
        , success: "请求成功时回调"
        , timeout: "请求超时时回调"
        , token: "请求提交的身份信息"
        , url: "数据地址"
        , callback: "自定义回调"
    };
 * @param time 请求次数，无则为0，大于2次返回错误
 * @param api
 */

var setRequest = function (req, option, time, api) {
  time = time ? time : 0;
  if (!api) {
    api = config["system"]["api"];
  }
  var new_url = 'add' in option && option.add || '';
  var api_url = config["url"][api]
    , _path = (new_url ? new_url : api_url) + option.url     //请求数据的地址
    , sess = {}
    , client = requestJson.createClient(api_url);
  console.log('请求地址：' + _path);
  if (req) {
    if (req && typeof req === "object") {
      sess = req && req.session;
    } else if (req && typeof req === "string") {//req直接为token
      sess.token = req;
    }
  }
  if ("token" in option && typeof option.token == "string" && option.token.length > 0) {
    client.headers["Authorization"] = option.token;
  } else if (sess && "token" in sess && typeof sess.token == "string" && sess.token.length > 0) {
    client.headers["Authorization"] = sess.token;
  }
  //根据请求参数调用不同的方法，并获取用户是否有自定义回调函数
  if (option.method === "get") {
    client.get(_path, option.data || {}, "callback" in option && option.callback || callback);
  } else if (option.method === "post") {
    client.post(_path, option.data || {}, "callback" in option && option.callback || callback);
  } else {//未指定请求方法时使用get
    client.get(_path, option.data || {}, "callback" in option && option.callback || callback);
  }
  /**
   * 回调函数
   * @param error     错误
   * @param response  返回
   * @param body      成功信息
   */
  function callback(error, response, body) {
    console.info("0--开始回调，访问请求地址：", _path);
    var err = option && option.error
      , success = option && option.success
      , timeout = option && option.timeout
      ;
    if (err && typeof err == "function") {
      if (error) {//请求发生错误
        //fixme 错误信息的logger实现
        console.info("1--请求数据时发生错误");
        err("获取api数据错误", error);
      } else {
        console.info("2--请求数据成功", response.statusCode, body);
        if (response.statusCode == 200) {//请求成功返回
          console.info("2.1--请求数据返回状态成功", typeof body)
          if (body && (typeof body == "string" || typeof body == "object")) {
            if ("status" in body) {
              if (success && typeof success == "function") {//成功时完成回调
                console.info("2.2-请求数据返回确认")
                success(body);//回调成功后的数据
              }
            } else {//发生错误
              err("请求数据错误，" + body.message);
            }
          }
        } else if (response.statusCode == 401) {//token过期
          var getTokenUrl = "http://" + config.api.url + "/v1/user/token", _client;
          _client = requestJson.createClient(getTokenUrl);
          _client.post(getTokenUrl, {
            phoneNum: sess.phoneNum
            , pwd: sess.pwd
          }, function (_err, _res, _body) {
            if (!_err && _res.statusCode == 200 && _body && "token" in _body) {
              sess["token"] = _body.token;
              option["token"] = _body.token;
              if (time < 2) {//fixme 重复次数小于2，重新发送本次请求
                setRequest(req ? req : null, option, time++);
              } else {
                err("多次连接数据服务器失败");
              }
            } else {
              err("token过期，重新请求失败," + err);
            }
          });
        } else {//请求超时
          if (timeout && typeof timeout == "function") {
            timeout();
          } else {
            err("获取api数据超时");
          }
        }
      }
    }
  }
};


module.exports = {
  request: setRequest
};