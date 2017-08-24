/**
 * Created by Administrator on 2017/5/24.
 */
"use strict";
var router = require('express').Router();
var Geetest = require('gt3-sdk');
var captcha = new Geetest({
    geetest_id: 'cccfefea0cb18d2a383763cff0ee40dc',
    geetest_key: 'a1bd0c676d78f0051c033eb40bb51b74'
});
router.get("/register", function (req, res) {

    // 向极验申请每次验证所需的challenge
    captcha.register({
        client_type: 'unknown',
        ip_address: 'unknown'
    }, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            req.session.fallback = true;
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            req.session.fallback = false;
            res.send(data);
        }
    });
});
router.post("/validate", function (req, res) {

    // 对ajax提供的验证凭证进行二次验证
    captcha.validate(req.session.fallback, {

        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode

    }, function (err, success) {

        if (err) {

            // 网络错误
            res.send({
                status: -1
                , message: '网络错误'
            });

        } else if (!success) {

            // 二次验证失败
            res.send({
                status: -1,
                message: '验证失败'
            });
        } else {
            res.send({
                status: 1,
                message: '验证成功'
            });
        }
    });
});

module.exports = router;