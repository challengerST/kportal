/**
 * Created by Jeremy on 2016/11/22.
 */
"use strict";
var url = require('../../frame/function').url;
var Listener = (function () {
  var listener = function () {
    $('.agent-sp').html(url.get('ag'));
    $('.user-sp').html(url.get('us'));
    $('.qyg').html(url.get('qy'));
    $('.mdg').html(url.get('md'));
    $('.hkgs').html(url.get('hq'));
    $('.zzfs').html(url.get('zz'));
    $('.qfsj').html(url.get('qf'));
    $('.hc').html(url.get('hc'));
    $('.bq').html(url.get('bq'));
    $('.ygzl').html(url.get('zl'));
    $('.ygtj').html(url.get('tj'));
    $('.ygjs').html(url.get('js'));
    $('.dj').html(url.get('dj'));
    $('.ygzj').html(url.get('zj'));
    var head = $('head')[0].outerHTML;
    var table = $('.table')[0].outerHTML;
    var code = '<html lang="zh-CN">' + head + '<body><div class="container">' + table + '</div></body></html>';
    code = code.replace('../../../images/img/watermark.png', 'http://kybpublic.oss-cn-shanghai.aliyuncs.com/images/img/watermark.png');
    code = code.replace('../../../images/img/logo_b.jpg', 'http://kybpublic.oss-cn-shanghai.aliyuncs.com/images/img/logo_b.jpg');
    $.ajax({
      url: '/api/down/pdf'
      , type: 'post'
      , data: {code: code, name: '报价单'}
      , dataType: 'json'
      , timeout: 100000
      , success: function (json) {
        if ('status' in json && json.status == 1) {
          window.open("/getImgCode/pdf");
        }
      }
    });
  };
  var run = function () {
    listener();
  };
  return {
    run: run
  }
}());
module.exports = Listener;