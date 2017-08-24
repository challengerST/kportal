/**
 * Created by Jeremy on 2016/11/20.
 */
module.exports = {
    "VERSION": require('../package.json')['version']
    , "NAME": require('../package.json')['name']
    , "development": {
        "system": {
            "host": "192.168.1.249"
            , "port": 9000
            , "cpu": 1
            , "api": "api"
        },
        "url": {
            "api": 'http://192.168.1.10:8000'
            , other: 'http://192.168.1.10:8080'
        },
        "redis": {
            "host": "192.168.1.10"
            , "port": "6379"
            , "db": 3
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
        , "validate": {
            "times": 3
            , "interval": 1 * 60 * 60 * 1000
        }
    }
};