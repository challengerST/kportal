/**
 * Created by Jeremy on 2016/11/25.
 */
"use strict";
var request = require('../../utils/request').request;
var env = process.env.NODE_ENV || "development";
module.exports = {
    //登录
    login: function (token, data, callback) {
        var send = {
            mobile: data.Account
            , password: data.Pwd
        };
        request(token, {
            url: '/api/Member/Login'
            , method: 'post'
            , data: send
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: -1,
                    resMsg: "登录失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //注册
    , checkMobile: function (token, data, callback) {
        request(token, {
            url: '/api/Member/Exist/' + data.mobile
            , method: 'get'
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //注册手机
    , ckSms: function (token, data, callback) {
        request(token, {
            url: '/api/Member/CheckSmsCode'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //加盟
    , nextStep: function (token, data, callback) {
        request(token, {
            url: '/api/Member/FreightApplySubmitData'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //上传企业资料
    , uploadQy: function (token, data, callback) {
        request(token, {
            url: '/api/Member/FreightApplyUploadFile'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "上传失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //修改资料
    , editor: function (token, data, callback) {
        request(token, {
            url: '/api/Member/Update'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //修改密码
    , modify: function (token, data, callback) {
        request(token, {
            url: '/api/Member/Password'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }


    //重置邮件
    , send: function (token, data, callback) {
        request(token, {
            url: '/api/Account/SendResetPwdEmail?Email=' + (data && 'Email' in data && data.Email)
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //重置密码
    , reset: function (token, data, callback) {
        request(token, {
            url: '/api/Member/Reset'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //资质认证
    , auth: function (token, data, callback) {
        request(token, {
            url: '/api/Member/Verify'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "取消失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //增加公司文件
    , addFile: function (token, data, callback) {
        request(token, {
            url: '/api/FileManager/Company/New'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "上传失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //删除公司文件
    , removeFile: function (token, data, callback) {
        request(token, {
            url: '/api/FileManager/Company/Remove'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                var data = body && typeof body == 'object' && 'resCode' in body ? body : {
                    resCode: 1,
                    resMsg: "删除失败，请重试",
                    resBody: null
                };
                callback(error, data);
            }
        });
    }
    //激活邮箱
    , active: function (token, data, callback) {
        request(token, {
            url: '/api/Member/Email/Active'
            , method: 'post'
            , data: {key: data}
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //发送邮件
    , sendMail: function (token, data, callback) {
        request(token, {
            url: '/api/Member/Email'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //短信验证码
    , sendText: function (token, data, callback) {
        request(token, {
            url: '/api/Member/SmsCode'
            , method: 'post'
            , data: {mobile: data.mobile}
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //货代加盟短信验证码
    , sendSms: function (token, data, callback) {
        request(token, {
            url: '/api/Member/FreightJoinSmsCode'
            , method: 'post'
            , data: {mobile: data.mobile}
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //注册短信验证码
    , regSendSms: function (token, data, callback) {
        request(token, {
            url: '/api/Member/RegisterSmsCode'
            , method: 'post'
            , data: {mobile: data.mobile}
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //注册
    , register: function (token, data, callback) {
        request(token, {
            url: '/api/Member/NewRegister'
            , method: 'post'
            , data: data
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
    //短信验证码
    , forgetCode: function (token, data, callback) {
        request(token, {
            url: '/api/Member/ForgetCode'
            , method: 'post'
            , data: {mobile: data.mobile}
            , callback: function (error, resp, body) {
                callback(error, body);
            }
        });
    }
};