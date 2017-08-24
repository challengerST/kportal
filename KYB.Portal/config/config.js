/**
 * Created by Jeremy on 2016/11/20.
 */
module.exports = {
    "VERSION": require('../package.json')['version']
    , "NAME": require('../package.json')['name']
    , "development": {
        "system": {
            "host": "localhost"
            , "port": 3000
            , "cpu": 1
            , "api": "api"
        },
        "url": {
            "api": "http://192.168.1.10:8041"
            //"api": 'http://localhost:51690'
            , 'down': 'http://192.168.1.10:8080'
        },
        "redis": {
            "host": "192.168.1.10"
            , "port": "6379"
            , "db": 1
            , "ttl": 60 * 60 * 24 * 7
        }
        , "cookie": {
            "maxAge": 1000 * 60 * 60 * 24 * 7
        }
        , "captcha": {
            "url": "/api/captcha/"
            , "open": true
        }
        , "pdf": {
            "url": "/api/htmltopdf"
        }
        , "oss": {
            "token": "/api/ossauth"
            , "down": "/api/OssAuth/Download"
            , "up": "/api/OssAuth/Upload"
            , "excel": "/api/ExcelReader/Contact"
        }
        , "validate": {
            "times": 3
            , "interval": 1 * 60 * 60 * 1000
        }
    }
    , "production": {
        "system": {
            "host": "localhost"
            , "port": 3000
            , "cpu": 1
            , "api": "api"
        },
        "url": {
            "api": "http://192.168.1.10:8000"
            , 'down': 'http://192.168.1.10:8080'
        },
        "redis": {
            "host": "localhost"
            , "port": "6379"
            , "db": 1
            , "ttl": 60 * 60 * 24 * 7
        }
        , "cookie": {
            "maxAge": 1000 * 60 * 60 * 24 * 7
        }
        , "captcha": {
            "url": "/api/captcha/"
            , "open": true
        }
        , "pdf": {
            "url": "/api/htmltopdf"
        }
        , "oss": {
            "token": "/api/ossauth"
            , "down": "/api/OssAuth/Download"
            , "up": "/api/OssAuth/Upload"
        }
        , "validate": {
            "times": 3
            , "interval": 1 * 60 * 60 * 1000
        }
    }
};