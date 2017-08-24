/**
 * Created by Jeremy on 2016/11/20.
 */
module.exports = {
    "development": {
        "msg": "开发环境日志配置",
        "log4js": {
            "appenders": [
                {
                    "type": "console"
                },
                {
                    "type": "clustered",
                    "appenders": [
                        {
                            "type": "dateFile",
                            "filename": "./log/cluster/cluster.log",
                            "pattern": "-yyyy-MM-dd",
                            "category": "cluster"
                        },
                        {
                            "type": "dateFile",
                            "filename": "./log/http/http.log",
                            "pattern": "-yyyy-MM-dd",
                            "category": "http"
                        },
                        {
                            "type": "dateFile",
                            "filename": "./log/api/api.log",
                            "pattern": "-yyyy-MM-dd",
                            "category": "api"
                        },
                        {
                            "type": "dateFile",
                            "filename": "./log/error/error.log",
                            "pattern": "-yyyy-MM-dd",
                            "category": "error"
                        }
                    ]
                }
            ]
        }
    }
    ,"production": {
        "msg": "生产环境日志配置",
        "log4js": {
            "appenders": [
                {
                    "type": "console"
                },
                {
                    "type": "clustered",
                    "appenders": [
                        {
                            "type": "dateFile",
                            "filename": "./log/cluster/cluster.log",
                            "pattern": "-yyyy-MM-dd",
                            "category": "cluster"
                        },
                        {
                            "type": "dateFile",
                            "filename": "./log/http/http.log",
                            "pattern": "-yyyy-MM-dd",
                            "category": "http"
                        },
                        {
                            "type": "dateFile",
                            "filename": "./log/api/api.log",
                            "pattern": "-yyyy-MM-dd",
                            "category": "api"
                        },
                        {
                            "type": "dateFile",
                            "filename": "./log/error/error.log",
                            "pattern": "-yyyy-MM-dd",
                            "category": "error"
                        }
                    ]
                }
            ]
        }
    }
};