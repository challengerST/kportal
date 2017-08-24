/**
 * Created by Jeremy on 2016/11/23.
 */
"use strict";

var router = require("express").Router();
//我要发货
router.get('/', function (req, res) {
    var user = req.session && 'user' in req.session && req.session.user || {};
    var company = 'company' in user && user.company || {};
    var member = 'member' in user && user.member || {};
    return res.render('./delivery/view', {
        title: "我要发货"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'airline'
        , mb: company.companyName || member.name || member.mobile || ''
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//自助订舱 （原特价航线）
router.get('/special', function (req, res) {
    var user = req.session && 'user' in req.session && req.session.user || {};
    var company = 'company' in user && user.company || {};
    var member = 'member' in user && user.member || {};
    return res.render('./special/view', {
        title: "自助订舱"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'special'
        , ai: ('query' in req && req.query && 'ai' in req.query && req.query.ai) || '3U'
        , mb: company.companyName || member.name || member.mobile || ''
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//散货拼货
router.get('/mix', function (req, res) {
    var user = req.session && 'user' in req.session && req.session.user || {};
    var company = 'company' in user && user.company || {};
    var member = 'member' in user && user.member || {};
    return res.render('./mix/view', {
        title: "散货拼货"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'mix'
        , ai: ('query' in req && req.query && 'ai' in req.query && req.query.ai) || '3U'
        , mb: company.companyName || member.name || member.mobile || ''
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//快速订舱
router.get('/fast', function (req, res) {
    var user = req.session && 'user' in req.session && req.session.user || {};
    var company = 'company' in user && user.company || {};
    var member = 'member' in user && user.member || {};
    return res.render('./fast/view', {
        title: "快速订舱"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'fast'
        , ai: ('query' in req && req.query && 'ai' in req.query && req.query.ai) || '3U'
        , mb: company.companyName || member.name || member.mobile || ''
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
//报价单
router.get('/offer', function (req, res) {
    return res.render('./offer/bjd', {
        title: "报价单"
    });
});
module.exports = router;