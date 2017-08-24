/**
 * Created by Jeremy on 2016/11/23.
 */
"use strict";
var router = require("express").Router()
    , appeal = require('../../../service/appeal');

//列表
router.post('/list', function (req, res) {
    var data = req.body
        , user = req.session.user;
    data['memberId'] = user['member']['memberId'];
    data['companyId'] = user['company']['companyId'];
    data['roleId'] = user['role']['roleId'];
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    appeal.list('', data, function (err, body) {
        if (body && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '获取列表失败，请重试'
                , resBody: null
            });
        }
    });
});
//详情
router.post('/detail', function (req, res) {
    var data = req.body.id;
    appeal.detail('', data, function (err, body) {
        if (body && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '获取详情失败，请重试'
                , resBody: null
            });
        }
    });
});
module.exports = router;