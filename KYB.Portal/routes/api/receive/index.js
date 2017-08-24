/**
 * Created by Auser on 2016/11/29.
 */
var router = require("express").Router()
    , receive = require('../../../service/receive');
var request = require('request');
var env = process.env.NODE_ENV || "development";
var URI = require('../../../config/config')[env]['url']['down']
    , excel = require('../../../config/config')[env]['oss']['excel'];
//获取收发货人列表
router.post('/', function (req, res) {
    var body = req.body;
    var data = {
        memberId: req.session.user.member.memberId
        , type: body.tp
        , keyword: body.key
        , pageIndex: Math.floor(parseInt(body.offset / parseInt(body.limit))) + 1
        , pageSize: body.limit
    };
    receive.list('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '获取列表失败，请重试',
                resBody: null
            });
        }
    });
});

//修改收发货人信息
router.post('/update', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    receive.update('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '修改失败，请重试',
                resBody: null
            });
        }
    });
});

//新增收发货人信息
router.post('/add', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    receive.add('', data, function (err, body) {
        if (body && typeof body == 'object' && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '新增失败，请重试',
                resBody: null
            });
        }
    });
});
//获取详情
router.post('/detail', function (req, res) {
    var data = req.body;
    receive.detail('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '获取详情失败，请重试',
                resBody: null
            });
        }
    });
});
//单条删除
router.post('/del', function (req, res) {
    var data = req.body;
    receive.del('', data, function (err, body) {
        if (body && typeof body == 'object' && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '删除失败，请重试',
                resBody: null
            });
        }
    });
});
//解析excel
router.post('/excelReader', function (req, res) {
    request({
        method: 'post'
        , uri: URI + excel
        , json: req.body
    }, function (error, response, body) {
        return res.json(body);
    });
});
//批量添加
router.post('/multiAdd', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    data['companyId'] = req.session.user.company.companyId;
    receive.multiAdd('', data, function (err, body) {
        if (body && typeof body == 'object' && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '导入失败，请重试',
                resBody: null
            });
        }
    });
});
module.exports = router;