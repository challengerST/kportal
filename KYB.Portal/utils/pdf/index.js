/**
 * Created by Auser on 2017/5/4.
 */

module.exports = {
    bjd: function (data) {
        var w = data.wtr || {
                name: ''
                , address: ''
                , tel: ''
            }
            , t = data.tzr || {
                name: ''
                , address: ''
                , tel: ''
            }
            , b = data.btzr || {
                name: ''
                , address: ''
                , tel: ''
            };
        return '<!DOCTYPE html> <html lang="zh-CN"> <head> <meta charset="UTF-8"> ' +
            '<meta name="Generator" content="Jeremy"> <meta name="Author" content="Jeremy"> ' +
            '<meta name="Keywords" content=""> <meta name="Description" content=""> ' +
            '<title>报价单</title> <style> * {padding: 0;margin: 0;font-size: 12px;color: #333333;}.container {width: 1200px;margin: 0 auto;background:url("http://kybpublic.oss-cn-shanghai.aliyuncs.com/images/img/watermark.png") no-repeat;background-position: 99% 60px;}.title {font-size: 24px;text-align: center;height: 50px;line-height: 50px;}table {width: 100%;border-collapse: collapse;}table tr {border: 1px solid #666;height: 50px;}table td {text-align: center;width: 16.6%;}.bg-g {background-color: #ebebeb;font-size: 14px;}.tal {text-align: left;line-height: 22px;padding-left: 20px;}.tar {text-align: right;padding-right: 20px;font-size: 18px;}.footer{font-size:14px;color:#999999;line-height: 30px;} </style> </head>' +
            ' <body> <div class="container"> <p class="title">空运邦报价单</p> <table>' +
            ' <tbody> <tr> <td class="bg-g">委托人</td> <td class="tal" colspan="5">' + (w.name + '<br/>' + w.address + '<br/>' + (w.tel ? 'TEL: ' + w.tel : '')) + '</td> </tr> ' +
            '<tr> <td class="bg-g">通知人</td> <td class="pd tal" colspan="5"> ' + (t.name + '<br/>' + t.address + '<br/>' + (t.tel ? 'TEL: ' + t.tel : '')) + '</td> </tr> ' +
            '<tr> <td class="bg-g">被通知人</td> <td class="pd tal" colspan="5"> ' + (b.name + '<br/>' + b.address + '<br/>' + (b.tel ? 'TEL: ' + b.tel : '')) + '</td> </tr> ' +
            '<tr> <td class="bg-g">航空公司</td> <td class="bg-g">起飞日期</td> <td class="bg-g">航程</td> <td class="bg-g">起始港</td> <td class="bg-g">目的港</td> <td class="bg-g">中转</td> </tr> ' +
            '<tr> <td>' + data.hkgs + '</td> <td>' + data.qfrq + '</td> <td>' + data.hc + '</td> <td>' + data.qyg + '</td> <td>' + data.mdg + '</td> <td>' + (data.hc.split('->').length > 2 ? data.hc.split('->')[1] : '/') + '</td> </tr> ' +
            '<tr> <td class="bg-g">唛头</td> <td class="bg-g">货名</td> <td class="bg-g">件数（PCS）</td> <td class="bg-g">预估重量（KGS）</td> <td class="bg-g">预估体积（CBM）</td> <td class="bg-g">单价（CNY）</td> </tr> ' +
            '<tr> <td>N/A</td> <td>' + data.pm + '</td> <td>' + data.ygjs + '</td> <td>' + data.ygzl + '</td> <td>' + parseFloat(data.ygtj).toFixed(3) + '</td> <td>' + data.dj + '</td> </tr>' +
            ' <tr> <td colspan="6" class="tar bg-g">预估总价(CNY)：' + data.zj + '</td> </tr> </tbody> </table> ' +
            '<p class="footer">*以上为运费报价，其他费用实报实销</p> </div> </body> </html>'
    }
};