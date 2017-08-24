/**
 * Created by Jeremy on 2016/11/20.
 */
module.exports = {
    "VERSION": require('../package.json')['version']
    , "NAME": require('../package.json')['name']
    , "development": {
        "system": {
            "host": "localhost"
            , "port": 8000
            , "cpu": 1
            , "api": "api"
        },
        "url": {
            "api": 'http://192.168.1.10:8041'
           //"api": 'http://localhost:51690'
            , other: 'http://192.168.1.10:8080'
        },
        "redis": {
            "host": "192.168.1.10"
            , "port": "6379"
            , "db": 2
            , "ttl": 60 * 60 * 24 * 7
        }
        , "cookie": {
            "maxAge": 0//1000 * 60 * 60 * 24 * 7
        }
        , "oss": {
            "token": "/api/ossauth"
            , "down": "/api/OssAuth/Download"
            , "up": "/api/OssAuth/Upload"
            , "excel": "/api/ExcelReader/User"
        }
        , "captcha": {
            "url": "/api/captcha/"
            , "open": true
        }
        , "pdf": {
            "url": "/api/htmltopdf"
        }
        , "validate": {
            "times": 3
            , "interval": 1 * 60 * 60 * 1000
        }
    }
};