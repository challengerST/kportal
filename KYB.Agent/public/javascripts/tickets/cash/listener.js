/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
require('../../general/burster');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var url = require('../../general/function').url
    , Modal = require('../../general/modal');
var LIST;
var operateId;
var Listener = (function () {
    var listener = function () {
        $(document).on('click', '#search', function () {
            url.set('offset', 0);
            init();
        });
        $(document).on('click', '.outer-pages .pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.alert-part').addClass('dp-n');
        });
        $(document).on('click', '.cash-back', function () {
            var _this = $(this);
            operateId = $(this).data('id');
            var d = {
                "total": 0,
                "count": 0,
                "monthCount": 0,
                "monthTotal": 0,
                "lastCount": 0,
                "lastToal": 0,
                "companyId": 0
            };
            Data.sum({id: operateId}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    d = json.resBody;
                }
                var ele = $('.cash-part');
                ele.find('.main-info').html(_this.parents('tr').find('.name').html());
                ele.find('.ljxd').html(d.count);
                ele.find('.ljje').html(d.total);
                ele.find('.byljxd').html(d.monthCount);
                ele.find('.byljje').html(d.monthTotal);
                ele.find('.syljxd').html(d.lastCount);
                ele.find('.syljje').html(d.lastToal);
                ele.find('input').val('');
                $('.white-back').removeClass('dp-n');
                ele.removeClass('dp-n');
            });
        });
        $(document).on('click', '#ensure-fx', function () {
            var ele = $('#fx');
            if (ele.val()) {
                ele.removeClass('warm');
                var data = {
                    "companyId": operateId,
                    "operatorId": 0,
                    "money": ele.val()
                };
                Data.ensure(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert(json.resMsg || '提交返现申请成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '提交返现申请失败，请重试！');
                    }
                });
            } else {
                ele.addClass('warm');
            }
        });
        $(document).on('click', '.cash-history', function () {
            var name = $(this).parents('tr').find('.name').html();
            var data = {
                "companyId": $(this).data('id'),
                "confirmState": 99,
                "pageIndex": 1,
                "pageSize": 10000
            };
            Data.history(data, function (json) {
                if (json && 'resBody' in json && json.resBody && 'sList' in json.resBody && json.resBody.sList instanceof Array) {
                    var str = '';
                    var arr = json.resBody.sList;
                    if (arr.length > 0) {
                        for (var a in arr) {
                            if (arr.hasOwnProperty(a)) {
                                var d = arr[a];
                                var st = '', cls = '';
                                switch (d.confirmState) {
                                    case -1:
                                        cls = 'f-r';
                                        st = '审核失败';
                                        break;
                                    case 0:
                                        cls = 'f-g';
                                        st = '待审核';
                                        break;
                                    case 1:
                                        cls = 'f-b';
                                        st = '审核完成';
                                        break;
                                }
                                str += '<p> <span class="circle"></span> <span class="time">' + ('createDt' in d && d.createDt ? new Date(d.createDt).Format('yyyy-MM-dd') : '/') + '</span> <span class="money">返现 ' + d.balance + '</span> <span class="ste ' + cls + '">' + st + '</span> </p>'
                            }
                        }
                    } else {
                        str = '暂无记录'
                    }
                    $('.history-body').find('.main-info').html(name);
                    $('.history-part').find('.scroll-part').html(str);
                    $('.history-part').removeClass('dp-n');
                    $('.white-back').removeClass('dp-n');
                } else {
                    Modal.setAlert(json.resMsg || '获取失败，请重试');
                }
            });
        });
    };
    var init = function () {
        var data = {
            "keyword": $('#search-name').val(),
            "type": 99,
            "offset": url.get('offset') || 0,
            "limit": url.get('limit') || 20
        };
        Data.list(data, function (json) {
            LIST = Dom.list(json, data);
        });
    };

    var run = function () {
        listener();
        init();
    };
    return {
        run: run
    }
}());
module.exports.Listener = Listener;