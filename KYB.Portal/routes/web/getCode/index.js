/**
 * Created by Jeremy on 2016/11/25.
 */
"use strict";

var router = require("express").Router();
var request = require('request');
var env = process.env.NODE_ENV || "development";
var URI = require('../../../config/config')[env]['url']['down'];
var captcha = require('../../../config/config')[env]['captcha']['url'];
var pdf = require('../../../config/config')[env]['pdf']['url'];
var fs = require('fs');
var path = require('path');
var bjd = require('../../../utils/pdf').bjd;
//获取验证码
router.get('/', function (req, res) {
    var code = '';
    var random = [2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (var i = 0; i < 4; i++) {
        var index = Math.floor(Math.random() * random.length);
        code += random[index];
    }
    req.session.code = code;
    req.pipe(request(URI + captcha + code)).pipe(res);
});
//下载请求
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
router.get('/dlexcel', function (req, res) {
    fs.readFile(path.join(__dirname, '../../../public/upload/mb.xlsx'), function (err, body) {
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        var userAgent = (req.headers['user-agent'] || '').toLowerCase();

        if (userAgent.indexOf('msie') >= 0 || userAgent.indexOf('chrome') >= 0) {
            res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent('默认模板') + '.xlsx');
        } else if (userAgent.indexOf('firefox') >= 0) {
            res.setHeader('Content-Disposition', 'attachment; filename*="utf8\'\'' + encodeURIComponent('默认模板') + '.xlsx"');
        } else {
            /* safari等其他非主流浏览器只能自求多福了 */
            res.setHeader('Content-Disposition', 'attachment; filename=' + new Buffer('默认模板').toString('binary') + '.xlsx');
        }
        res.write(body);
        res.end();
    });
});

//下载报价单
router.get('/bjd', function (req, res) {
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


    request.post(URI + pdf).json({HtmlBody: bjd(req.session.dlData)}).pipe(res);
});


module.exports = router;