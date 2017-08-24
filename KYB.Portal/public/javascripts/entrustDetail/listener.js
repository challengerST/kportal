/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var Modal = require('../frame/modal');
var Listener = (function () {
  var Data = require('./data').Data;
  var listener = function () {
    $(document).on('click', '#download', function () {
      var code = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title> 对账单 </title><style>.order-part:{width: 740px;margin: 20px auto 0;background-color: #fff;padding: 10px 20px;} .info{overflow: hidden;}.header{@include HEIGHT(30px);text-align: center;font-size: 20px;}.info span{@include HEIGHT(30px);}table{width: 100%;}td{height: 50px;width: 100px;text-align: center;}.fl-l{float:left;}.fl-r{float:right;}.dp-b{display:block;}</style></head><body>';
      code += $('.order-part')[0].outerHTML;
      code += '</body></html>';
      $.ajax({
        url: '/api/down/pdf'
        , type: 'post'
        , data: {code: code, name: '订舱委托书'}
        , dataType: 'json'
        , timeout: 100000
        , success: function (json) {
          if ('status' in json && json.status == 1) {
            window.open("/getImgCode/pdf");
          }
        }
      });
    });
  };
  var run = function () {
    listener();
  };
  return {
    run: run
  }
}());
module.exports = Listener;