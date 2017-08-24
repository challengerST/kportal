/**
 * Created by Auser on 2016/12/13.
 */
require('../frame/burster');
var url = require('../frame/function').url;
var Modal = require('../frame/modal');
var Listener = (function () {
    var Data = require('./data').Data
        , Dom = require('./dom').Dom;
    var tickets = [];
    var List = {};
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
        $(document).on('click', 'input[name="all"]', function () {
            $('input[name="sg"][disabled!="disabled"]').prop('checked', $(this).prop('checked'));
        });
    };
    var init = function () {
        var load = '<tr class="wrong-msg"><td colspan="9"><div class="loading-box"><div class="spinner"> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div><div class="rect4"></div><div class="rect5"></div> </div></div></td></tr>';
        $('tbody').html(load);
        var data = {
            "companyId": 0,
            "agentCompanyId": 0,
            "chargeBillNo": $('#id').val(),
            "state": $('#state').find('option:selected').val(),
            "billState": 99,
            "offset": url.get('offset') || 0,
            "limit": url.get('limit') || 20
        };
        Data.list(data, function (json) {
            List = Dom.list(json, data);
        });
    };
    var appeal = function () {
        $(document).on('click', '#appeal', function () {
            var arr = [];
            $('input[name="sg"][disabled!="disabled"]:checked').each(function () {
                arr.push($(this).val());
            });
            if (arr.length > 0) {
                if (tickets.length > 0) {
                    var price = 0;
                    var numStr = '您共有 <span class="font-y">' + arr.length + '</span> 笔账单需要开票：';
                    var option = '';
                    for (var a in arr) {
                        if (arr.hasOwnProperty(a)) {
                            var d = List[arr[a]];
                            price += (d.totalAmount || 0);
                            numStr += arr[a] + (a == arr.length - 1 ? '' : '&nbsp;&nbsp;&nbsp;');
                            option += '<option value="' + (parseInt(a) + 1) + '">' + (parseInt(a) + 1) + '</option>'
                        }
                    }
                    var ele = $('.appeal-part');
                    ele.find('p.info').html(numStr);
                    ele.find('.price').find('.ft-r').html(price);
                    ele.find('#fp-num').html(option);
                    ele.find('.appeal-body').html(addTicket(0, 1, price));
                    $('.white-back').removeClass('dp-n');
                    ele.removeClass('dp-n');
                } else {
                    Modal.setAlert('暂无开票资料，请添加！', null, function () {
                        location.href = '/vip/ticket';
                    });
                }
            }
        });
        $(document).on('change', '.sel-tt', function () {
            $(this).siblings('.fpzl').html($(this).find('option:selected').val() == 1 ? '普票' : '增票');
        });
        $(document).on('change', '#fp-num', function () {
            var num = parseInt($(this).find('option:selected').val());
            var len = $('.appeal-part').find('.appeal-body').find('.sg-fp').length;
            //删除dom
            if (num < len) {
                for (var i = num; i < len; i++) {
                    $('.appeal-part').find('.appeal-body').find('.sg-fp').eq(num).remove();
                }
            }
            //增加dom
            if (num > len) {
                $('.appeal-part').find('.appeal-body').append(addTicket(len, num));
            }
        });
        $(document).on('keyup', '.kpje', function () {
            $(this).val($(this).val().replace(/[^\-?\d.]/g, ''));
        });
        $(document).on('click', '#appeal-ensure', function () {
            var pass = true;
            var price = 0;
            $('.kpje').each(function () {
                if (!parseFloat($(this).val())) {
                    $(this).addClass('warm');
                    pass = false;
                } else {
                    price += parseFloat($(this).val());
                    $(this).removeClass('warm');
                }
            });
            if (pass) {
                if (price == $('.appeal-part').find('.price').find('.ft-r').html()) {
                    var arr = [];
                    $('input[name="sg"][disabled!="disabled"]:checked').each(function () {
                        arr.push($(this).val());
                    });
                    var list = [];
                    $('.appeal-part').find('.appeal-body').find('.sg-fp').each(function () {
                        list.push({
                            totalAmount: $(this).find('.kpje').val()
                            , invoiceId: $(this).find('.sel-tt').find('option:selected').val()
                        });
                    });
                    var data = {
                        "agentCompanyId": 0,
                        "totalAmount": price,
                        "memberId": 0,
                        "companyId": 0,
                        "billNums": arr,
                        "taxInvoiceItemList": list
                    };
                    Data.appeal(data, function (json) {
                        if (json && 'resCode' in json && json.resCode != 0) {
                            Modal.setAlert(json.resMsg || '申请失败');
                        } else {
                            Modal.setAlert(json.resMsg || '申请成功', null, function () {
                                location.reload();
                            });
                        }
                    });
                } else {
                    Modal.setAlert('输入金额与总金额不一致！');
                }
            }
        });
    };
    var addTicket = function (len, num, price) {
        var idx = len + 1;
        var option = '';
        var str = '';
        for (var t in tickets) {
            if (tickets.hasOwnProperty(t)) {
                var d = tickets[t];
                option += '<option value="' + d.invoiceId + '" data-type="' + d.invoiceType + '">' + d.invoiceTitle + '</option>';
            }
        }
        for (var i = 0; i < (num - len); i++) {
            str += '<p class="sg-fp">' + (idx++) + '. 发票抬头：<select class="sel-tt">' + option + '</select>发票种类：<span class="fpzl">' + (tickets[0].invoiceType == 1 ? '普票' : '增票') + '</span>开票金额：<span><input type="text" class="kpje" autocomplete="off" value="' + (price || 0) + '">CNY</span> </p>'
        }
        return str;
    };
    var ticketInit = function () {
        Data.ticket(function (json) {
            tickets = json && 'resCode' in json && json.resBody.sList || [];
        });
    };
    var run = function () {
        listener();
        init();
        ticketInit();
        appeal();
    };
    return {
        run: run
    }
}());
module.exports = Listener;