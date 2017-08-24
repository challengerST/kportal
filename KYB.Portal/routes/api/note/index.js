/**
 * Created by Auser on 2016/11/29.
 */
var router = require("express").Router()
    , note = require('../../../service/note');

//获取消息列表
router.post('/list', function (req, res) {
    var body = req.body;
    var data = {
        type: body.type
        , pageIndex: Math.floor(parseInt(body.offset / parseInt(body.limit))) + 1
        , pageSize: body.limit
        , state: body.state
        , memberId: req.session.user.member.memberId
    };
    note.list('', data, function (err, body) {
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
//标记消息
router.post('/read', function (req, res) {
    note.read('', req.body, function (err, body) {
        if (body && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '标记失败，请重试',
                resBody: null
            });
        }
    });
});
//删除消息
router.post('/del', function (req, res) {
    note.del('', req.body, function (err, body) {
        if (body && 'resCode' in body) {
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
//保存设置
router.post('/save', function (req, res) {
    var data = req.body;
    data.memberId = req.session.user.member.memberId;
    data.companyId = req.session.user.company.companyId;
    note.save('', data, function (err, body) {
        if (body && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '保存失败，请重试',
                resBody: null
            });
        }
    });
});
module.exports = router;