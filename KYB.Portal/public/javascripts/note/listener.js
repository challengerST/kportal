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
    $(document).on('click', '.pages', function () {
      $('.sel-all').prop('checked', false);
      url.set('offset', $(this).data('offset'));
      init();
    });
    $(document).on('click', '.sel-all', function () {
      $(this).parents('.hide-part').find('input[name="tb-sel"]').prop('checked', $(this).prop('checked'));
      check($(this));
    });
    $(document).on('click', 'input[name="tb-sel"]', function () {
      check($(this));
    });
    $('.nav-tabs').on('click', 'li', function () {
      var tp = $(this).data('tar')
        , ele = $('.note-' + tp);
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      ele.addClass('active');
      ele.siblings().removeClass('active');
      url.set('ta', $(this).data('tar'));
      if ($(this).data('load') == 0) {
        init();
        $(this).data('load', 1)
      }
    });
    $(document).on('click', '.read-btn', function () {
      var arr = [];
      $(this).parents('.hide-part').find('input[name="tb-sel"]').each(function () {
        if ($(this).prop('checked')) {
          arr.push($(this).data('id'));
        }
      });
      if (arr.length > 0) {
        var data = {
          list: arr
        };
        Data.read(data, function (json) {
          if (json && 'resCode' in json && json.resCode != 0) {
            Modal.setAlert(json.resMsg);
          } else {
            Modal.setAlert(json.resMsg || '标记成功', null, function () {
              location.reload();
            });
          }
        });
      }
    });
    $(document).on('click', '.delete-btn', function () {
      var arr = [];
      $(this).parents('.hide-part').find('input[name="tb-sel"]').each(function () {
        if ($(this).prop('checked')) {
          arr.push($(this).data('id'));
        }
      });
      if (arr.length > 0) {
        var data = {
          list: arr
        };
        Data.del(data, function (json) {
          if (json && 'resCode' in json && json.resCode != 0) {
            Modal.setAlert(json.resMsg);
          } else {
            Modal.setAlert(json.resMsg || '删除成功', null, function () {
              location.reload();
            });
          }
        });
      }
    });
    $(document).on('click', '.detail-delete', function () {
      var data = {
        list: [$(this).data('id')]
      };
      Data.del(data, function (json) {
        if (json && 'resCode' in json && json.resCode != 0) {
          Modal.setAlert(json.resMsg);
        } else {
          Modal.setAlert(json.resMsg || '删除成功', null, function () {
            location.href = '/vip/note';
          });
        }
      });
    });
  };
  var init = function () {
    var tp = url.get('tp') || 'all'
      , ta = url.get('ta') || 'all';
    var data = {
      offset: url.get('offset') || 0
      , limit: 20
      , type: ta == 'order' ? 20 : (ta == 'system' ? 10 : 999)
      , state: tp == 'unread' ? 1 : 999
    };
    Data.list(data, function (json) {
      Dom.list(json, $('.note-' + ta), data)
    });
  };
  var check = function (ele) {
    var n = 0;
    ele.parents('.hide-part').find('input[name="tb-sel"]').each(function () {
      if ($(this).prop('checked')) {
        n += 1;
      }
    });
    ele.parents('.hide-part').find('button').prop('disabled', n == 0);
  };
  var saveSet = function () {
    $(document).on('click', '#save-set', function () {
        var arr = [];
        $('#set-tb tbody tr').each(function () {
          arr.push({
            "infoType": $(this).data('type'),
            "remark": $(this).find('.name').text(),
            "enableWeChat": $(this).find('.wt').prop('checked'),
            "enableEmail": $(this).find('.em').prop('checked')
          });
        });
        var data = {
          "memberId": 0,
          "settingId": 0,
          "companyId": 0,
          "Settings": arr
        };
        Data.save(data, function (json) {
          Modal.setAlert(json.resMsg || (json && 'resCode' in json && json.resCode == 0 ? '保存成功' : '保存失败'));
        });
      }
    );
  };
  var run = function () {
    listener();
    init();
    saveSet();
  };
  return {
    run: run
  }
}());
module.exports = Listener;