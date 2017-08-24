/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();
var role = require('../../../../service/staff/role');

//角色管理
router.post('/list', function (req, res) {
    var data = req.body || 0;
    role.list('', data, function (err, body) {
        return res.json(body);
    });
});
module.exports = router;