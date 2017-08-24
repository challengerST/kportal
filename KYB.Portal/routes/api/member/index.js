/**
 * Created by Auser on 2016/11/29.
 */
var router = require("express").Router()
    , member = require('../../../service/member');

//获取角色列表
router.post('/role', function (req, res) {
    var data = {
        type: 0
    };
    member.role('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '添加失败，请重试',
                resBody: null
            });
        }
    });
});
//获取员工列表
router.post('/list', function (req, res) {
    var data = req.body;
    data['companyId'] = req.session.user.company.companyId;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    member.list('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '获取失败，请重试',
                resBody: null
            });
        }
    });
});
//获取员工下属订单
router.post('/orders', function (req, res) {
    var data = req.body;
    data['pageSize'] = parseInt(data['limit']);
    data['pageIndex'] = Math.floor(parseInt(data.offset / parseInt(data.limit))) + 1;
    member.orders('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '获取失败，请重试',
                resBody: null
            });
        }
    });
});
//启用&禁用
router.post('/state', function (req, res) {
    var data = req.body;
    data['requestmemberId'] = req.session.user.member.memberId;
    member.state('', data, function (err, body) {
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
//批量启用&禁用
router.post('/multiStates', function (req, res) {
    var data = req.body;
    data['requestmemberId'] = req.session.user.member.memberId;
    member.multiStates('', data, function (err, body) {
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
//新增员工
router.post('/add', function (req, res) {
    var data = req.body;
    data['requestmemberId'] = req.session.user.member.memberId;
    data['companyId'] = req.session.user.company.companyId;
    member.add('', data, function (err, body) {
        if (body && 'resCode' in body) {
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
//新增员工
router.post('/transfer', function (req, res) {
    var data = req.body;
    data['requireMeberId'] = req.session.user.member.memberId;
    data['companyId'] = req.session.user.company.companyId;
    member.transfer('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '转移失败，请重试',
                resBody: null
            });
        }
    });
});
//更新角色
router.post('/update', function (req, res) {
    var data = req.body;
    data['requestMemberId'] = req.session.user.member.memberId;
    member.update('', data, function (err, body) {
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
module.exports = router;