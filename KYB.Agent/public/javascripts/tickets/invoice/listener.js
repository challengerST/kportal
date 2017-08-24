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
        $(document).on('click', '.show-detail', function () {
            Data.detail({id: $(this).data('id')}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    var ele = $('.detail-part');
                    var d = json.resBody;
                    var state = '';
                    switch (d.taxInvoice.taxInvoiceState) {
                        case 0:
                            state = '未开票';
                            break;
                        case 1:
                            state = '已开票';
                            break;
                        case 2:
                            state = '部分开票';
                            break;
                    }
                    ele.find('.lsh').html(d.taxInvoice.taxInvoiceNum);
                    ele.find('.sqsj').html(d.invoiceDate ? new Date(d.invoiceDate).Format('yyyy-MM-dd') : '/');
                    ele.find('.kpzt').html(state);
                    var str = '';
                    str += '<tr><td>' + d.taxInvoice.taxInvoiceNum + '</td><td>' + d.taxInvoice.invoiceTitle + '</td>' +
                        '<td>' + (d.taxInvoice.invoiceType == 1 ? '普票' : '增票') + '</td><td>' + d.totalAmount + '</td>' +
                        '<td><input type="text" class="fphm" value="' + (d.taxInvoice.taxNo || '') + '"></td>' +
                        '<td><input type="text" class="kddh" value="' + (d.taxInvoice.ems || '') + '"></td>' +
                        '<td><input type="text" class="bz" value="' + (d.taxInvoice.remark || '') + '"></td></tr>';
                    ele.find('tbody').html(str);
                    $('.white-back').removeClass('dp-n');
                    ele.removeClass('dp-n');
                } else {
                    Modal.setAlert(json.resMsg || '获取详情失败，请重试！');
                }
            });
        });
        $(document).on('click', '#detail-update', function () {
            var ele = $('.detail-part');
            var data = {
                "taxInvoiceNum": ele.find('.lsh').html(),
                "remark": ele.find('.bz').val(),
                "ems": ele.find('.kddh').val(),
                "taxNo": ele.find('.fphm').val(),
                "agentId": 0,
                "companyId": 0,
                "roleId": 0
            };
            if (data.taxNo) {
                ele.find('.fphm').removeClass('warm');
                Data.update(data, function (json) {
                    if (json && 'resCode' in json && json.resCode == 0) {
                        Modal.setAlert(json.resMsg || '更新成功！', null, function () {
                            location.reload();
                        });
                    } else {
                        Modal.setAlert(json.resMsg || '更新失败，请重试！');
                    }
                });
            } else {
                ele.find('.fphm').addClass('warm');
            }
        });
    };
    var init = function () {
        var data = {
            "agentCompanyId": 0,
            "agentId": 0,
            "billNum": $('#search-zdbh').val(),
            "taxInvoiceNum": $('#search-lsh').val(),
            "roleId": 0,
            "state": $('#fkzt').find('option:selected').val(),
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