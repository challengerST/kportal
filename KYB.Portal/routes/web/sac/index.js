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
    return res.render('./shopAgentcompany/view', {
        title: "店铺主页"
        , user: 'session' in req && req.session && 'user' in req.session && req.session.user || {}
        , pos: 'airline'
        , mb: company.companyName || member.name || member.mobile || ''
        , notes: 'session' in req && req.session && 'notes' in req.session && req.session.notes || {}
    });
});
module.exports = router;