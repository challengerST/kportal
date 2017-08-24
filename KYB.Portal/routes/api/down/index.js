/**
 * Created by Jeremy on 2016/11/23.
 */
"use strict";
var router = require('express').Router();
var request = require('request');
var env = process.env.NODE_ENV || "development";
var URI = require('../../../config/config')[env]['url']['down']
    , down = require('../../../config/config')[env]['oss']['down']
    , up = require('../../../config/config')[env]['oss']['up'];
//下载pdf
router.post('/pdf', function (req, res) {
    req.session.pdf = req.body.code;
    req.session.dlname = req.body.name;
    return res.json({
        status: 1
        , msg: 'success'
    });
});

//下载报价单
router.post('/bjd', function (req, res) {
    var company = 'user' in req.session && req.session.user && 'company' in req.session.user && req.session.user.company || {};
    req.session.dlData = req.body.d;
    req.session.dlname = req.body.name;
    req.session.dlData['wtr'] = {
        name: company.companyName
        , address: company.companyAddress
        , tel: company.companyTel
    };
    return res.json({
        status: 1
        , msg: 'success'
    });
});

//获取oss 下载token
router.post('/ossDown', function (req, res) {
    request({
        method: 'post'
        , uri: URI + down
        , json: req.body
    }, function (error, response, body) {
        return res.json(body);
    });
});
//获取oss 上传token
router.post('/ossUp', function (req, res) {
    request({
        method: 'post'
        , uri: URI + up
        , json: req.body
    }, function (error, response, body) {

        return res.json(body);
    });
});
module.exports = router;