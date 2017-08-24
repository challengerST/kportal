/**
 * Created by zrz on 2016/7/14.
 * @version 1.0.0 created
 */

"use strict";

var nodeExport = require('excel-export');

module.exports = {
    excelExport: {
        w: function (array) {
            var conf = {};
            conf.stylesXmlFile = "./utils/excelExport/styles.xml";
            conf.name = 'sheet';
            conf.cols = [{
                caption: '订单编号',
                type: 'string'
            }, {
                caption: '仓库名称',
                type: 'string'
            }, {
                caption: '项目',
                type: 'string'
            }, {
                caption: '金额',
                type: 'string'
            }, {
                caption: '时间',
                type: 'string'
            }];
            conf.rows = array;
            return nodeExport.execute(conf);
        }, d: function (array) {
            var conf = {};
            conf.stylesXmlFile = "./utils/excelExport/styles.xml";
            conf.name = 'sheet';
            conf.cols = [{
                caption: '订单编号',
                type: 'string'
            }, {
                caption: '报关行',
                type: 'string'
            }, {
                caption: '项目',
                type: 'string'
            }, {
                caption: '金额',
                type: 'string'
            }, {
                caption: '时间',
                type: 'string'
            }];
            conf.rows = array;
            return nodeExport.execute(conf);
        }
    }
};