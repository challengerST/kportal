/**
 * Created by Jeremy on 2016/11/20.
 */
"use strict";
var router = require('express').Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var env = process.env.NODE_ENV || "development";
var URI = require('../../../config/config')[env]['url']['other'];
var pdf = require('../../../config/config')[env]['pdf']['url'];
//订单中心（待处理）
router.get('/excel', function (req, res) {
    fs.readFile(path.join(__dirname, '../../../public/tempExcel/mb.xlsx'), function (err, body) {
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        var userAgent = (req.headers['user-agent'] || '').toLowerCase();

        if (userAgent.indexOf('msie') >= 0 || userAgent.indexOf('chrome') >= 0) {
            res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent('会员名单模板') + '.xlsx');
        } else if (userAgent.indexOf('firefox') >= 0) {
            res.setHeader('Content-Disposition', 'attachment; filename*="utf8\'\'' + encodeURIComponent('会员名单模板') + '.xlsx"');
        } else {
            /* safari等其他非主流浏览器只能自求多福了 */
            res.setHeader('Content-Disposition', 'attachment; filename=' + new Buffer('会员名单模板').toString('binary') + '.xlsx');
        }
        res.write(body);
        res.end();
    });
});
//pdf
router.get('/pdf', function (req, res) {
    res.setHeader('Content-Type', 'application/pdf');


    var userAgent = (req.headers['user-agent'] || '').toLowerCase();

    if (userAgent.indexOf('msie') >= 0 || userAgent.indexOf('chrome') >= 0) {
        res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent(req.session.dlname) + '.pdf');
    } else if (userAgent.indexOf('firefox') >= 0) {
        res.setHeader('Content-Disposition', 'attachment; filename*="utf8\'\'' + encodeURIComponent(req.session.dlname) + '.pdf"');
    } else {
        /* safari等其他非主流浏览器只能自求多福了 */
        res.setHeader('Content-Disposition', 'attachment; filename=' + new Buffer(req.session.dlname).toString('binary') + '.pdf');
    }

    //res.setHeader('Content-Disposition', 'attachment;filename=' + encodeURI(req.session.dlname) + '.pdf');


    request.post(URI + pdf).json({HtmlBody: req.session.pdf}).pipe(res);
});
module.exports = router;