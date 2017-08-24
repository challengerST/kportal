/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var url = require('../frame/function').url;
var Modal = require('../frame/modal');
var Data = require('./data').Data
    , Dom = require('./dom').Dom;
var Listener = (function () {
    var listener = function () {
        $(document).on('click', '.close-btn', function () {
            $('.white-back').addClass('dp-n');
            $('.alert-part').addClass('dp-n');
        });
        $(document).on('click', '.search-btn', function () {
            url.set('offset', 0);
            init();
        });
        $(document).on('click', '.pages', function () {
            url.set('offset', $(this).data('offset'));
            init();
        });
        $(document).on('click', '.show-detail', function () {
            Data.detail({id: $(this).data('id')}, function (json) {
                if (json && 'resCode' in json && json.resCode == 0) {
                    var d = json.resBody;
                    var ele = $('.appeal-part');

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

                    ele.find('.lsh').html(d.taxInvoice.taxInvoiceNum || '/');
                    ele.find('.state').html(state || '/');
                    ele.find('.fptt').html(d.taxInvoice.invoiceTitle || '/');
                    ele.find('.fpzl').html(d.taxInvoice.invoiceType == 1 ? '普票' : '增票');
                    ele.find('.kpje').html(d.totalAmount || '/');
                    ele.find('.fph').html(d.taxInvoice.taxNo || '/');
                    ele.find('.ydh').find('.dtl').html(d.taxInvoice.ems || '/');
                    $('.white-back').removeClass('dp-n');
                    ele.removeClass('dp-n');
                } else {
                    Modal.setAlert(json.resMsg || '获取详情失败，请重试');
                }
            });
        });
    };
    var init = function () {
        var load = '<tr class="wrong-msg"><td colspan="9"><div class="loading-box"><div class="spinner"> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div><div class="rect4"></div><div class="rect5"></div> </div></div></td></tr>';
        $('tbody').html(load);
        var data = {
            "memberId": 0,
            "companyId": 0,
            "billNum": $('#id').val(),
            "taxInvoiceNum": $('#lsh').val(),
            "state": $('#state').find('option:selected').val(),
            "roleId": 0,
            "offset": url.get('offset') || 0,
            "limit": url.get('limit') || 20
        };
        Data.list(data, function (json) {
            Dom.list(json, data);
        });
    };
    var run = function () {
        init();
        listener();
    };
    return {
        run: run
    }
}());
module.exports = Listener;