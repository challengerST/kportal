/**
 * Created by Jeremy on 2017/1/16.
 */
'use strict';
var router = require("express").Router();

//航线维护
router.use('/manage', require('./manage'));

module.exports = router;