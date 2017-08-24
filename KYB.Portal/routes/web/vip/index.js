/**
 * Created by Auser on 2016/12/1.
 */
"use strict";

var router = require("express").Router();
var vipService = require('../../../service/vip')
    , billService = require('../../../service/bill')
    , member = require('../../../service/member')
    , account = require('../../../service/account')
    , note = require('../../../service/note')
    , order = require('../../../service/order');
var moment = require('moment');
//personal
router.get('/person', function (req, res) {
    return res.render('./newVip/person/view', {
        title: "个人中心"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'vip'
        , part: 'personal'
        , index: 1
        , parts: 'query' in req && req.query && 'tp' in req.query && req.query.tp || 'all'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//order
router.get('/order', function (req, res) {
    return res.render('./newVip/order/view', {
        title: "委托的订单"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'vip'
        , part: 'buyer_center'
        , index: 2
        , parts: 'query' in req && req.query && 'tp' in req.query && req.query.tp || 'all'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//contact
router.get('/contact', function (req, res) {
    console.log(req.query);
    return res.render('./newVip/contact/view', {
        title: "常用联系人"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'vip'
        , part: 'buyer_center'
        , index: 3
        , parts: 'query' in req && req.query && 'tp' in req.query && req.query.tp || '全部'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//staff
router.get('/staff', function (req, res) {
    return res.render('./newVip/staff/view', {
        title: "员工管理"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'vip'
        , part: 'staff'
        , index: 4
        , parts: 'query' in req && req.query && 'tp' in req.query && req.query.tp || 'all'
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//订单详情
router.get('/order/detail', function (req, res) {
    var data = {
        "orderId": req.query.id,
        "memberId": req.session.user.member.memberId,
        "subOrderNum": req.query.sid || null
    };
    vipService.detail('', data, function (err, body) {
        console.log(body);
        return res.render('./vip/detail/view', {
            title: "订单详情"
            , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
            , pos: 'detail'
            , data: body
            , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
        });
    });
});
//
////会员中心
//router.get('/', function (req, res) {
//    var data = req.session.user.member.memberId;
//    vipService.info('', data, function (err, body) {
//        req.session.user = body.resBody || {};
//        return res.render('./newVip/vip/center/view', {
//            title: "会员首页"
//            , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//            , pos: 'vip'
//            , part: 'center'
//            , index:1
//            , data: 'resBody' in body && body.resBody || {}
//            , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//        });
//    });
//});
////编辑个人资料
//router.get('/editor', function (req, res) {
//    var data = req.session.user.member.memberId;
//    vipService.info('', data, function (err, body) {
//        return res.render('./vip/vip/editor/view', {
//            title: "编辑个人资料"
//            , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//            , pos: 'vip'
//            , part: 'center'
//            //, index:
//            , data: 'resBody' in body && body.resBody || {}
//            , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//        });
//    });
//});
////修改密码
//router.get('/reset', function (req, res) {
//    return res.render('./vip/vip/reset/view', {
//        title: "修改密码"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'center'
//        , index: 3
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
////资质认证
//router.get('/auth', function (req, res) {
//    var data = req.session.user.member.memberId;
//    vipService.info('', data, function (err, body) {
//        req.session.user = body.resBody || {};
//        member.level('', req.session.user.company.agentCompanyId, function (err, dt) {
//            return res.render('./vip/vip/auth/view', {
//                title: "资质认证"
//                , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//                , pos: 'vip'
//                , part: 'center'
//                , index: 4
//                , company: req.session.user.company || {}
//                , body: dt
//                , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//            });
//        });
//    });
//});
////收发货人
//router.get('/relation', function (req, res) {
//    return res.render('./vip/vip/relation/view', {
//        title: "收发货人"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'center'
//        , index: 5
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//        , tb: req.query.tb || 'receive'
//    });
//});
////我的抵用券
//router.get('/voucher', function (req, res) {
//    return res.render('./vip/vip/voucher/view', {
//        title: "我的抵用券"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'center'
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
////费用清单
//router.get('/bill', function (req, res) {
//    return res.render('./vip/bill/list/view', {
//        title: "费用清单"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'bill'
//        , index: 6
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
////费用清单详情
//router.get('/bill/detail', function (req, res) {
//    var id = req.query.id;
//    billService.detail('', id, function (err, body) {
//        console.log(body);
//        return res.render('./vip/bill/detail/view', {
//            title: "费用清单详情",
//            user: 'session' in req && req.session && 'user' in req.session && req.session.user || {},
//            pos: 'vip',
//            part: 'bill'
//            ,
//            index: 6
//            ,
//            body: body && typeof body == 'object' && 'resCode' in body && body.resCode == 0 && 'resBody' in body && body.resBody || {}
//            ,
//            notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//        });
//    });
//});
////对账单
//router.get('/account', function (req, res) {
//    return res.render('./vip/account/list/view', {
//        title: "对账单"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'bill'
//        , index: 7
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
////对账单详情
//router.get('/account/detail', function (req, res) {
//    var id = req.query.id;
//    account.detail('', id, function (err, body) {
//        return res.render('./vip/account/detail/view', {
//            title: "对账单详情",
//            user: 'session' in req && req.session && 'user' in req.session && req.session.user || {},
//            pos: 'vip',
//            part: 'bill'
//            ,
//            index: 7
//            ,
//            body: body && typeof body == 'object' && 'resCode' in body && body.resCode == 0 && 'resBody' in body && body.resBody || {}
//            ,
//            notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//        });
//    });
//});
////开票资料
//router.get('/appeal', function (req, res) {
//    return res.render('./vip/vip/appeal/view', {
//        title: "开票申请"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'bill'
//        , index: 8
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
////开票资料
//router.get('/ticket', function (req, res) {
//    return res.render('./vip/vip/ticket/view', {
//        title: "开票资料"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'bill'
//        , index: 9
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
////personal
//router.get('/person', function (req, res) {
//    return res.render('./newVip/person/view', {
//        title: "个人中心"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'personal'
//        , parts: 'query' in req && req.query && 'tp' in req.query && req.query.tp || 'all'
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
////order
//router.get('/order', function (req, res) {
//    return res.render('./newVip/order/view', {
//        title: "委托的订单"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'buyer_center'
//        , index: 1
//        , parts: 'query' in req && req.query && 'tp' in req.query && req.query.tp || 'all'
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
////contact
//router.get('/contact', function (req, res) {
//    return res.render('./newVip/contact/view', {
//        title: "常用联系人"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'buyer_center'
//        , index: 2
//        , parts: 'query' in req && req.query && 'tp' in req.query && req.query.tp || 'all'
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
////member
//router.get('/staff', function (req, res) {
//    return res.render('./newVip/staff/view', {
//        title: "员工管理"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'staff'
//        , parts: 'query' in req && req.query && 'tp' in req.query && req.query.tp || 'all'
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
////订单详情
//router.get('/order/detail', function (req, res) {
//    var data = {
//        "orderId": req.query.id,
//        "memberId": req.session.user.member.memberId,
//        "subOrderNum": req.query.sid || null
//    };
//    vipService.detail('', data, function (err, body) {
//        console.log(body);
//        return res.render('./vip/detail/view', {
//            title: "订单详情"
//            , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//            , pos: 'detail'
//            , data: body
//            , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//        });
//    });
//});
//
////提单确认
//router.get('/order/detail/ensure', function (req, res) {
//    var data = {
//        "orderId": req.query.id,
//        subOrderNum: req.query.sid || null,
//        "memberId": req.session.user.member.memberId
//    };
//    vipService.detail('', data, function (err, body) {
//        return res.render('./vip/lading/view', {
//            title: "提单确认"
//            , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//            , pos: 'detail'
//            , data: body
//            , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//        });
//    });
//});
//
////预录单
//router.get('/order/detail/yld', function (req, res) {
//    order.declareData('', req.query.id, function (err, body) {
//        return res.render('./vip/yld/view', {
//            title: "预录单"
//            , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//            , pos: 'detail'
//            , data: body
//            , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//        });
//    });
//});
////放行通知书
//router.get('/order/detail/ckd', function (req, res) {
//    order.declareData('', req.query.id, function (err, body) {
//        return res.render('./vip/ckd/view', {
//            title: "放行通知书"
//            , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//            , pos: 'detail'
//            , data: body
//            , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//        });
//    });
//});
//
////消息中心
//router.get('/note', function (req, res) {
//    return res.render('./vip/note/view', {
//        title: "消息中心"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'note'
//        , index: 'tp' in req.query && req.query.tp == 'unread' ? 15 : 14
//        , txt: 'tp' in req.query && req.query.tp == 'unread' ? '未读消息' : '全部消息'
//        , ta: req.query.ta || 'all'
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
////消息设置
//router.get('/noteSet', function (req, res) {
//    note.setting('', req.session.user.member.memberId, function (err, body) {
//        return res.render('./vip/noteSet/view', {
//            title: "消息设置"
//            , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//            , pos: 'vip'
//            , part: 'note'
//            , index: 16
//            , data: body
//            , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//        });
//    });
//});
////消息详情
//router.get('/note/detail', function (req, res) {
//    note.detail('', req.query.id || 0, function (err, body) {
//        if (body && 'resBody' in body && body.resBody && 'createDt' in body.resBody && body.resBody.createDt) {
//            body.resBody.createDt = moment(body.resBody.createDt).format('YYYY-MM-DD HH:mm');
//        }
//        return res.render('./vip/noteDetail/view', {
//            title: "消息详情"
//            , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//            , pos: 'vip'
//            , part: 'note'
//            , data: typeof body == 'string' ? JSON.parse(body) : body
//            , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//        });
//    })
//});
////我的委托书
//router.get('/entrust', function (req, res) {
//    return res.render('./vip/entrust/list/view', {
//        title: "我的委托书"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'entrust'
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
////我的委托书
//router.get('/entrust/detail', function (req, res) {
//    return res.render('./vip/entrust/detail/view', {
//        title: "委托书详情"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'entrust'
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
//
////员工列表
//router.get('/member/list', function (req, res) {
//    return res.render('./vip/member/list/view', {
//        title: "员工列表"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'member'
//        , index: 10
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
////员工详情
//router.get('/member/detail', function (req, res) {
//    member.detail('', req.query.id, function (err, body) {
//        return res.render('./vip/member/detail/view', {
//            title: "员工详情"
//            , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//            , pos: 'vip'
//            , part: 'member'
//            , index: 10
//            , data: body
//            , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//        });
//    })
//});
////角色管理
//router.get('/member/role', function (req, res) {
//    return res.render('./vip/member/role/view', {
//        title: "角色管理"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'member'
//        , index: 11
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
////航空公司搜索
//router.get('/search/company', function (req, res) {
//    return res.render('./vip/search/company/view', {
//        title: "航空公司查询"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'tool'
//        , index: 13
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
////机场搜索
//router.get('/search/airports', function (req, res) {
//    return res.render('./vip/search/airports/view', {
//        title: "机场查询"
//        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
//        , pos: 'vip'
//        , part: 'tool'
//        , index: 12
//        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
//    });
//});
module.exports = router;