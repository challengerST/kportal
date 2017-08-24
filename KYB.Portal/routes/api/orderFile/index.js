/**
 * Created by Auser on 2016/11/29.
 */
var router = require("express").Router()
    , orderFile = require('../../../service/orderFile');

//添加订单附件
router.post('/add', function (req, res) {
    var data = req.body;
    orderFile.add('', data, function (err, body) {
        console.log(body);
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
//删除订单附件
router.post('/remove', function (req, res) {
    var data = req.body;
    orderFile.remove('', data, function (err, body) {
        console.log(body);
        if (body && 'resCode' in body && body.resCode == 0) {
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
//订单附件列表
router.post('/list', function (req, res) {
    var data = req.body;
    orderFile.list('', data, function (err, body) {
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
module.exports = router;