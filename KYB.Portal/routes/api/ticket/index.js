/**
 * Created by Jeremy on 2016/11/23.
 */
"use strict";
var router = require("express").Router()
    , ticketService = require('../../../service/ticket');
//新增票型
router.post('/add', function (req, res) {
    var data = req.body
        , user = req.session.user;
    data['memberId'] = user['member']['memberId'];
    ticketService.add('', data, function (err, body) {
        if (body && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '新增失败，请重试'
                , resBody: null
            });
        }
    });
});
//列表
router.post('/list', function (req, res) {
    ticketService.list('', req.session.user.member.memberId, function (err, body) {
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
//删除
router.post('/del', function (req, res) {
    var data = req.body
        , user = req.session.user;
    data['memberId'] = user['member']['memberId'];
    ticketService.del('', data, function (err, body) {
        if (body && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '删除失败，请重试'
                , resBody: null
            });
        }
    });
});
//更新
router.post('/update', function (req, res) {
    var data = req.body
        , user = req.session.user;
    data['memberId'] = user['member']['memberId'];
    ticketService.update('', data, function (err, body) {
        if (body && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '更新失败，请重试'
                , resBody: null
            });
        }
    });
});
//开票申请
router.post('/appeal', function (req, res) {
    var data = req.body
        , user = req.session.user;
    data['memberId'] = user['member']['memberId'];
    data['companyId'] = user['company']['companyId'];
    data['agentCompanyId'] = user['company']['agentCompanyId'];
    ticketService.appeal('', data, function (err, body) {
        if (body && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '申请失败，请重试'
                , resBody: null
            });
        }
    });
});
module.exports = router;