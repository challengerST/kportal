/**
 * Created by Jeremy on 2016/11/20.
 */
//加载依赖库
var express = require('express')
    , path = require('path')
    , favicon = require('serve-favicon')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , cluster = require('cluster')
    , session = require("express-session")
    , RedisStore = require('connect-redis')(session)
    , env = process.env.NODE_ENV || "development"
    , flash = require('connect-flash')
    , config = require('./config/config')[env]
    , Logger = require('./utils/logger/log4js').Logger;

//加载路由控制
var API = require("./routes/api")
    , WEB = require("./routes/web");
//创建项目实例
var app = express();
//定义前端模板的路径
app.set('views', path.join(__dirname, 'views'));
//定义前端模板
app.set('view engine', 'ejs');
if (env === "production") {//生产环境开启模板缓存
    app.set('view cache', true);
} else {//测试、开发环境关闭模板缓存
    app.set('view cache', false);
}


//开启压缩  gzip / deflate
//app.use(express.compress());
//定义常用工具
app.use(favicon(__dirname + '/public/favicon.ico'));//定义icon图标
app.use(bodyParser.urlencoded({extended: true, parameterLimit: 1000000, limit: '50mb'}));//定义url编码方式
app.use(bodyParser.json({limit: '50mb', type: 'application/*+json'}));//定义数据解析器
app.use(cookieParser());//定义cookie解析器
app.use(express.static(path.join(__dirname, 'public')));//定义静态文件目录
app.use(flash());//session特殊内存空间
//设置session
app.use(session({//连接redis
    store: new RedisStore(config["redis"]),
    resave: true,
    saveUninitialized: false,
    //cookie: config.cookie,    sid过期时间，保存状态必须！！！！！
    secret: 'Kyb_Be_server',
    key: 'kyb_be_sv'
}));

/**
 *   拦截请求，生成访问日志
 * */
app.use(function (req, res, next) {
    Logger('http').info("cluster:" + cluster.worker.id
        + ";    sid:" + ('session' in req && req.session && "store" in req.session && req.session.store.id || -1)
        + ";    ip:" + getClientAddress(req)
        + ";    url:" + req.url
        + ";    method:" + req.method
        + ";    queries:" + JSON.stringify(req.query)
        + ";    body:" + JSON.stringify(req.body));
    next();
    //nginx转发后获取实际IP信息
    function getClientAddress(req) {
        return (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
    }
});

//拦截请求
app.use('/api', API);
app.use('/', WEB);

/**
 *   拦截错误请求，生成错误日志
 * */
app.use(function (err, req, res, next) {
    if (err) {
        var error = {
            sid: ('session' in req && req.session && "store" in req.session && req.session.store.id || -1)
            , method: req.method
            , url: req.originalUrl
            , message: err.message
            , stack: err.stack
        };
        Logger('error').error(JSON.stringify({error: error}));
        //跳转错误展示页面
        return res.render('./error.ejs', {
            status: err.status || err.statusCode
            , stack: err.stack
        });
    } else {
        next();
    }
});

/**
 *   404错误处理
 * */
app.use(function (req, res) {
    var error = {
        sid: ('session' in req && req.session && "store" in req.session && req.session.store.id || -1)
        , ip: (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress
        , method: req.method
        , url: req.originalUrl
        , status: 404
    };
    Logger('error').error(JSON.stringify(error));
    return res.render('./404.ejs');
});

module.exports.app = app;