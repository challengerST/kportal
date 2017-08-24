/**
 * Created by Auser on 2016/11/29.
 */
var router = require("express").Router()
    , airlineService = require('../../../service/airline');

//获取该公司能搜索的航线
router.post('/company', function (req, res) {
    var data = {
        id: 10000
    };
    airlineService.airline('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '航线搜索失败，请重试',
                resBody: null
            });
        }
    });
});
//搜索分区
router.post('/getArea', function (req, res) {
    var data = req.body;
    data['companyId'] = 10000;
    airlineService.getArea('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '航线搜索失败，请重试',
                resBody: null
            });
        }
    });
});
//航线详情
router.post('/detail', function (req, res) {
    var data = req.body;
    airlineService.detail('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '获取详情失败，请重试',
                resBody: null
            });
        }
    });
});
//计算运费
router.post('/calculate', function (req, res) {
    var data = req.body;
    airlineService.calculate('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '获取详情失败，请重试',
                resBody: null
            });
        }
    });
});
//杂费清单
router.post('/extra', function (req, res) {
    var data = req.body;
    data['companyId'] = 10000;
    airlineService.extra('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '获取详情失败，请重试',
                resBody: null
            });
        }
    });
});
//快速订舱杂费清单
router.post('/fastExtra', function (req, res) {
    var data = req.body;
    data['companyId'] = 10000;
    airlineService.fastExtra('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '获取详情失败，请重试',
                resBody: null
            });
        }
    });
});
//快速订舱杂费清单
router.post('/fastPrice', function (req, res) {
    var data = req.body;
    airlineService.fastPrice('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '获取详情失败，请重试',
                resBody: null
            });
        }
    });
});

//搜索航空港
router.post('/airport', function (req, res) {
    var data = req.body;
    airlineService.airport('', data, function (err, body) {
        if (body && typeof body === 'object' && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '获取航空港失败，请重试'
                , resBody: null
            });
        }
    })
});
//搜索航空公司
router.post('/aircom', function (req, res) {
    var data = req.body;
    airlineService.aircom('', data, function (err, body) {
        if (body && typeof body === 'object' && 'resCode' in body) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1
                , resMsg: '获取航空公司失败，请重试'
                , resBody: null
            });
        }
    })
});

//快速订舱航线搜索
router.post('/fastSearch', function (req, res) {
    var data = req.body;
    airlineService.fastSearch('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '搜索失败，请重试',
                resBody: null
            });
        }
    });
});
//航线搜索接口
router.post('/search', function (req, res) {
    var data = req.body;
    data['pageSize'] = parseInt(req.body['limit']);
    data['pageIndex'] = Math.floor(parseInt(req.body.offset / parseInt(req.body.limit))) + 1;
    airlineService.search('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '搜索失败，请重试',
                resBody: null
            });
        }
    });
});
//店铺航线搜索接口
router.post('/searchList', function (req, res) {
    var data = req.body;
    //data['memberId'] = req.session.user.member.memberId;
    data['pageSize'] = parseInt(req.body['limit']);
    data['pageIndex'] = Math.floor(parseInt(req.body.offset / parseInt(req.body.limit))) + 1;
    airlineService.searchList('', data, function (err, body) {
        if (body && 'resCode' in body && body.resCode == 0) {
            return res.json(body);
        } else {
            return res.json({
                resCode: 1,
                resMsg: '搜索失败，请重试',
                resBody: null
            });
        }
    });
});
//历史报价
router.post('/history', function (req, res) {
    var data = req.body.id;
    airlineService.history('', data, function (err, body) {
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
//费用模板
router.post('/expensetExmplate', function (req, res) {
    var data = req.body.templ;
    airlineService.expenseTemplate('', data, function (err, body) {
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
//杂费费用模板
router.post('/zFexpenseTem', function (req, res) {
    var data = req.body;
    airlineService.zFexpenseTemplate('', data, function (err, body) {
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