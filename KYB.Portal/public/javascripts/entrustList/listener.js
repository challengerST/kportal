/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var url = require('../frame/function').url;
var Data = require('./data').Data
  , Dom = require('./dom').Dom;
var Modal = require('../frame/modal');
var Listener = (function () {
  var listener = function () {
    $('#f-date').datetimepicker({
      format: 'yyyy-mm-dd',//日期的格式
      startDate: new Date(),//选择器的开始日期
      autoclose: true,//日期选择完成后是否关闭选择框
      bootcssVer: 3,//显示向左向右的箭头
      language: 'zh-CN',//语言
      minView: "month"//表示日期选择的最小范围，默认是hour
    });
    $('#h-date').datetimepicker({
      format: 'yyyy-mm-dd',//日期的格式
      startDate: new Date(),//选择器的开始日期
      autoclose: true,//日期选择完成后是否关闭选择框
      bootcssVer: 3,//显示向左向右的箭头
      language: 'zh-CN',//语言
      minView: "month"//表示日期选择的最小范围，默认是hour
    })
    $(document).on('click', '.type-sel span', function () {
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      url.set('type', $(this).data('type'));
      operate();
      init();
    });
  };
  var operate = function () {
    var tp = url.get('type') || 'all';
    var str = '';
    if (tp == 'all') {
      str += '<button class="sm-btn bg-w" id="send-mail">发送邮件</button><button class="sm-btn bg-w" id="download">下载</button>' +
      '<button class="sm-btn bg-w" id="re-order">重新委托</button><button class="sm-btn bg-w" id="delete">删除</button>' +
      '<button class="sm-btn bg-w" id="cancel">取消</button><button class="sm-btn blue-btn" id="search">搜索</button>'
    } else if (tp == 'doing') {
      str += '<button class="sm-btn bg-w" id="send-mail">发送邮件</button><button class="sm-btn bg-w" id="download">下载</button>' +
      '<button class="sm-btn bg-w" id="cancel">取消</button><button class="sm-btn blue-btn" id="search">搜索</button>'
    } else if (tp == 'cancel') {
      str += '<button class="sm-btn bg-w" id="send-mail">发送邮件</button><button class="sm-btn bg-w" id="download">下载</button>' +
      '<button class="sm-btn bg-w" id="re-order">重新委托</button>' +
      '<button class="sm-btn bg-w" id="cancel">取消</button><button class="sm-btn blue-btn" id="search">搜索</button>'
    } else if (tp == 'refuse') {
      str += '<button class="sm-btn bg-w" id="send-mail">发送邮件</button><button class="sm-btn bg-w" id="download">下载</button>' +
      '<button class="sm-btn bg-w" id="cancel">取消</button><button class="sm-btn blue-btn" id="search">搜索</button>'
    } else if (tp == 'done') {
      str += '<button class="sm-btn bg-w" id="send-mail">发送邮件</button><button class="sm-btn bg-w" id="download">下载</button>' +
      '<button class="sm-btn blue-btn" id="search">搜索</button>'
    }
    $('.operate-part').html(str);
  };
  var init = function () {
    var tp = url.get('type') || 'all', state;
    switch (tp) {
      case 'all':
        state = 0;
        break;
      case 'doing':
        state = 1;
        break;
      case 'cancel':
        state = 2;
        break;
      case 'refuse':
        state = 3;
        break;
      case 'done':
        state = 4;
        break;
      case 'delete':
        state = -1;
        break;
    }
    var data = {
      memberId: 0,
      state: state,
      offset: url.get('offset') || 0,
      limit: url.get('limit') || 20
    };
    Data.list(data, function (json) {
      console.log(json);
    });
  };
  var run = function () {
    listener();
    $('.type-sel').find('span[data-type="' + (url.get('type') || 'all') + '"]').addClass('active');
    operate();
    init();
  };
  return {
    run: run
  }
}());
module.exports = Listener;