/**
 * Created by Jeremy on 2017/1/5.
 */
'use strict';
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var url = require('../../general/function').url
    , Modal = require('../../general/modal');
var type = 0;//0新增，1修改
var code = '';//type为1时，修改的目的港代码
var obj = {};//修改的对象
var Listener = (function () {
    var listener = function () {
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.alert-part').addClass('dp-n');
        });
        $(document).on('click', '.outer-page .pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $(document).on('click', '#search', function () {
            url.set('offset', 0);
            init();
        });
        $(document).on('click', '#add', function () {
            type = 0;
            code = '';
            var ele = $('.ticket-modal');
            ele.find('.header').html('新增 <span class="close-btn">X</span>');
            ele.find('input').val('');
            ele.find('#add-jcdm').attr('readonly', false);
            $('.white-back').removeClass('dp-n');
            ele.removeClass('dp-n');
        });
        $(document).on('click', '.update', function () {
            type = 1;
            code = $(this).data('code');
            Data.detail({code: code}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    var ele = $('.ticket-modal');
                    ele.find('.header').html('编辑 <span class="close-btn">X</span>');
                    ele.find('#add-jcdm').attr('readonly', true);
                    ele.find('input').val('');
                    var d = json.resBody || {};
                    obj = d;
                    var p = d.PriceList.rate[0] || {};
                    $('#add-jcdm').val(d.destCode);
                    $('#add-n').val(p.policy['0'] || '');
                    $('#add-m').val(p.min || '');
                    $('#add-45').val(p.policy['45'] || '');
                    $('#add-100').val(p.policy['100'] || '');
                    $('#add-300').val(p.policy['300'] || '');
                    $('#add-500').val(p.policy['500'] || '');
                    $('#add-1000').val(p.policy['1000'] || '');
                    $('#add-ms').val(d.airlineName || '');

                    $('.white-back').removeClass('dp-n');
                    ele.removeClass('dp-n');
                } else {
                    Modal.setAlert(json.resMsg || '获取详情失败，请重试');
                }
            });
        });
        $(document).on('click', '#submit', function () {
            var pass = true;
            $('.ticket-modal').find('input.require').each(function () {
                if ($(this).val()) {
                    $(this).removeClass('warm');
                } else {
                    $(this).addClass('warm');
                    pass = false;
                }
            });
            if (pass) {
                var data = {
                    "PriceList": {
                        "rate": [
                            {
                                "proportion": 0,
                                "min": $('#add-m').val(),
                                "policy": {
                                    '0': $('#add-n').val(),
                                    '45': $('#add-45').val(),
                                    '100': $('#add-100').val(),
                                    '300': $('#add-300').val(),
                                    '500': $('#add-500').val(),
                                    '1000': $('#add-1000').val()
                                }
                            }
                        ]
                    },
                    "Id": type == 0 ? '' : obj.Id,
                    "destCode": $('#add-jcdm').val(),
                    "airlineName": $('#add-ms').val(),
                    "createDt": type == 0 ? new Date() : obj.createDt,
                    "expireDt": type == 0 ? new Date() : obj.expireDt,
                    "modifyDt": type == 0 ? new Date() : obj.modifyDt
                };
                if (type == 0) {
                    Data.add(data, function (json) {
                        if (json && 'resCode' in json && json.resCode == 0) {
                            Modal.setAlert(json.resMsg || '添加成功！', null, function () {
                                location.reload();
                            });
                        } else {
                            Modal.setAlert(json.resMsg || '添加失败，请重试！');
                        }
                    });
                } else {
                    Data.update(data, function (json) {
                        if (json && 'resCode' in json && json.resCode == 0) {
                            Modal.setAlert(json.resMsg || '更新成功！', null, function () {
                                location.reload();
                            });
                        } else {
                            Modal.setAlert(json.resMsg || '更新失败，请重试！');
                        }
                    });
                }
            }
        });

    };
    var init = function () {
        var data = {
            "destCode": $('#name').val(),
            offset: url.get('offset') || 0,
            limit: url.get('limit') || 20
        };
        Data.list(data, function (json) {
            Dom.list(json, data);
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