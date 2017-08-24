/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
var router = require('express').Router();
var invoice = require('../../../service/tickets/invoice');
var excelExport = require('../../../utils/excelExport').excelExport;
var moment = require('moment');
//费用清单
router.get('/expense', function (req, res) {
    return res.render('./tickets/expense/view', {
        title: "费用清单"
        , position: 'tickets'
        , part: 'expense'
        , user: req.session.user || {}
    });
});
//对账单
router.get('/account', function (req, res) {
    return res.render('./tickets/account/view', {
        title: "对账单"
        , position: 'tickets'
        , part: 'account'
        , user: req.session.user || {}
    });
});
//开票管理
router.get('/invoice', function (req, res) {
    return res.render('./tickets/invoice/view', {
        title: "开票管理"
        , position: 'tickets'
        , part: 'invoice'
        , user: req.session.user || {}
    });
});
//客户返现
router.get('/cash', function (req, res) {
    return res.render('./tickets/cash/view', {
        title: "客户返现"
        , position: 'tickets'
        , part: 'cash'
        , user: req.session.user || {}
    });
});
//返现审核
router.get('/examine', function (req, res) {
    return res.render('./tickets/examine/view', {
        title: "返现审核"
        , position: 'tickets'
        , part: 'examine'
        , user: req.session.user || {}
    });
});
//仓库费用清单
router.get('/wPrice', function (req, res) {
    return res.render('./tickets/wPrice/view', {
        title: "仓库费用清单"
        , position: 'tickets'
        , part: 'wPrice'
        , user: req.session.user || {}
    });
});
//仓库费用清单导出
router.get('/exportW', function (req, res) {
    var data = {
        "wareHoureId": req.query.id,
        "timeFrom": req.query.s,
        "timeTo": req.query.e
    };
    invoice.exportW('', data, function (err, body) {
        if (body && 'resBody' in body && body.resBody instanceof Array) {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');

            var userAgent = (req.headers['user-agent'] || '').toLowerCase();

            if (userAgent.indexOf('msie') >= 0 || userAgent.indexOf('chrome') >= 0) {
                res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent('仓库费用清单') + '.xlsx');
            } else if (userAgent.indexOf('firefox') >= 0) {
                res.setHeader('Content-Disposition', 'attachment; filename*="utf8\'\'' + encodeURIComponent('仓库费用清单') + '.xlsx"');
            } else {
                /* safari等其他非主流浏览器只能自求多福了 */
                res.setHeader('Content-Disposition', 'attachment; filename=' + new Buffer('仓库费用清单').toString('binary') + '.xlsx');
            }

            res.end(excelExport.w(initData(body.resBody, 1)), 'binary');
        } else {
            //fixme 错误处理
            var errorMsg =  '请求错误';
            if(body && 'resMsg' in body){
                var errorMsg = body.resMsg;
            }
            return res.json({
                status: 0
                , msg: errorMsg
            });
        }
    });
});
//报关行费用清单
router.get('/dPrice', function (req, res) {
    return res.render('./tickets/dPrice/view', {
        title: "报关行费用清单"
        , position: 'tickets'
        , part: 'dPrice'
        , user: req.session.user || {}
    });
});
//仓库费用清单导出
router.get('/exportD', function (req, res) {
    var data = {
        "declareCompanyId": req.query.id,
        "timeFrom": req.query.s,
        "timeTo": req.query.e
    };
    invoice.exportD('', data, function (err, body) {
        if (body && 'resBody' in body && body.resBody instanceof Array) {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            var userAgent = (req.headers['user-agent'] || '').toLowerCase();

            if (userAgent.indexOf('msie') >= 0 || userAgent.indexOf('chrome') >= 0) {
                res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent('报关行费用清单') + '.xlsx');
            } else if (userAgent.indexOf('firefox') >= 0) {
                res.setHeader('Content-Disposition', 'attachment; filename*="utf8\'\'' + encodeURIComponent('报关行费用清单') + '.xlsx"');
            } else {
                /* safari等其他非主流浏览器只能自求多福了 */
                res.setHeader('Content-Disposition', 'attachment; filename=' + new Buffer('报关行费用清单').toString('binary') + '.xlsx');
            }
            res.end(excelExport.d(initData(body.resBody, 0)), 'binary');
        } else {
            //fixme 错误处理
            return res.json({
                status: 0
                , msg: '请求错误'
            });
        }
    });
});


function initData(data, w) {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        arr.push([d.orderNum, w ? d.wareHouseName : d.declareCompanyName, d.itemName, d.itemTotal.toString(), moment(d.createDt).format('YYYY-MM-DD')]);
    }
    return arr;
}


module.exports = router;