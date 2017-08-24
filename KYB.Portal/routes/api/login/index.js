/**
 * Created by Jeremy on 2016/11/23.
 */
"use strict";
var request = require('request');
var env = process.env.NODE_ENV || "development";
var URI = require('../../../config/config')[env]['url']['down'];
var router = require("express").Router()
    , loginService = require('../../../service/login')
    , ossUrl = require('../../../config/config')[env]['oss']['url']
    , open = require('../../../config/config')[env]['captcha']['open'];
//登录出错的次数以及时间
var times = parseInt(require('../../../config/config')[env]['validate']['times'])
    , interval = parseInt(require('../../../config/config')[env]['validate']['interval']);
//gt3
var Geetest = require('../../../utils/gt3');

//登录请求
router.post('/', function (req, res) {
    Geetest.validate(req, res, function () {
        var data = req.body;
        loginService.login('', data, function (err, body) {
            if ('resBody' in body && body.resBody && typeof body.resBody === 'object') {
                req.session.user = body.resBody;
                req.session.keepL = data.keepL;
            }
            body.url = req.session.loginUrl;
            return res.json(body);
        });
    });
});
//查询手机号是否存在
router.post('/checkMobile', function (req, res) {
    loginService.checkMobile('', req.body, function (err, body) {
        //服务器返回什么就是什么
        return res.json(body);

    });
});
//发送手机验证码
router.post('/sendText', function (req, res) {
    var data = req.body;
    Geetest.validate(req, res, function () {
        loginService.sendText('', data, function (err, body) {
            if (body && typeof body === 'object' && 'resCode' in body) {
                return res.json(body);
            } else {
                return res.json({
                    resCode: 1
                    , resMsg: '发送失败，请重试'
                    , resBody: null
                });
            }
        });
    });
});
//货代发送手机验证码
router.post('/sendSms', function (req, res) {
    loginService.sendSms('', req.body, function (err, body) {
        return res.json(body);
    });
});
//注册发送手机验证码
router.post('/regSendSms', function (req, res) {
    loginService.regSendSms('', req.body, function (err, body) {
        return res.json(body);
    });
});
//重置密码
router.post('/forgetCode', function (req, res) {
    var data = req.body;
    Geetest.validate(req, res, function () {
        console.log('短信请求已发送！！！！！！');
        loginService.forgetCode('', data, function (err, body) {
            if (body && typeof body === 'object' && 'resCode' in body) {
                return res.json(body);
            } else {
                return res.json({
                    resCode: 1
                    , resMsg: '发送失败，请重试'
                    , resBody: null
                });
            }
        });
    });
});
//注册请求
router.post('/register', function (req, res) {
    var body = req.body;
    loginService.register('', body, function (err, body) {
        if (body && typeof body === 'object' && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '注册失败，请重试'
                , resBody: null
            });
        }
    });
});
//加盟请求
router.post('/nextStep', function (req, res) {
    var body = req.body;
    loginService.nextStep('', body, function (err, body) {
        if (body && typeof body === 'object' && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '加盟失败，请重试'
                , resBody: null
            });
        }
    });
});
//加盟请求
router.post('/ckSms', function (req, res) {
    var body = req.body;
    loginService.ckSms('', body, function (err, body) {
        if (body && typeof body === 'object' && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '无法进行下一步'
                , resBody: null
            });
        }
    });
});
//上传公司资料
router.post('/uploadQy', function (req, res) {
    var body = req.body;
    loginService.uploadQy('', body, function (err, body) {
        if (body && typeof body === 'object' && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '上传失败，请重试'
                , resBody: null
            });
        }
    });
});
//修改资料
router.post('/editor', function (req, res) {
    var data = req.body;
    data['memberId'] = req.session.user.member.memberId;
    loginService.editor('', data, function (err, body) {
        if (body && typeof body === 'object' && 'resCode' in body) {
            if (body.resCode == 0) {
                req.session.user = body.resBody;
            }
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '修改失败，请重试'
                , resBody: null
            });
        }
    })
});
//修改密码
router.post('/modify', function (req, res) {
    var data = req.body
        , user = req.session.user.member;
    data['memberId'] = user['memberId'];
    data['mobile'] = user['mobile'];
    loginService.modify('', data, function (err, body) {
        if (body && typeof body === 'object' && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '修改失败，请重试'
                , resBody: null
            });
        }
    })
});


//重置邮件
router.post('/send', function (req, res) {
    var data = req.body;
    var code = req.body.code.toUpperCase();
    if (code === req.session.code) {
        loginService.send('', data, function (err, body) {
            if (body && typeof body === 'object' && 'resCode' in body) {
                return res.json(body);
            } else {
                return res.json({
                    resCode: 1
                    , resMsg: '发送失败，请重试'
                    , resBody: null
                });
            }
        });
    } else {
        return res.json({
            resCode: 10
            , resMsg: '验证码错误'
            , resBody: null
        });
    }
});
//忘记密码重置
router.post('/reset', function (req, res) {
    var data = req.body;
    loginService.reset('', data, function (err, body) {
        if (body && typeof body === 'object' && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '修改失败，请重试'
                , resBody: null
            });
        }
    })
});


//获取oss token
router.post('/ossToken', function (req, res) {
    request.get(URI + ossUrl, function (error, response, body) {
        return res.json(JSON.parse(body));
    });
});
//资质认证
router.post('/auth', function (req, res) {
    var data = req.body
        , user = req.session.user.member;
    data['memberId'] = user['memberId'];
    loginService.auth('', data, function (err, body) {
        return res.json(body)
    })
});
//添加企业文件
router.post('/addFile', function (req, res) {
    var data = req.body
        , user = req.session.user;
    //data['companyId'] = user['company']['companyId'];
    loginService.addFile('', data, function (err, body) {
        return res.json(body)
    })
});
//删除企业文件
router.post('/removeFile', function (req, res) {
    var data = req.body
        , user = req.session.user;
    //data['companyId'] = user['company']['companyId'];
    loginService.removeFile('', data, function (err, body) {
        return res.json(body)
    })
});
//发送邮件
router.post('/sendMail', function (req, res) {
    var data = req.body
        , user = req.session.user.member;
    data['memberId'] = user['memberId'];
    loginService.sendMail('', data, function (err, body) {
        return res.json(body)
    })
});
module.exports = router;