/**
 * Created by Auser on 2016/12/7.
 */
"use strict";
var Dom = (function () {
    var list = function (data, param) {
        var str = '';
        if (data && 'resCode' in data && data.resCode == 0) {
            if ('resBody' in data && data.resBody && 'sList' in data.resBody && data.resBody.sList instanceof Array && data.resBody.sList.length > 0) {
                var json = data.resBody;
                var list = json.sList;
                for (var l in list) {
                    if (list.hasOwnProperty(l)) {
                        var obj = list[l];
                        str += '<p class="news-list"><a href="/home/news/detail?id=' + obj.Id + '">' + obj.newsTitle + '</a> <span>' + new Date(obj.modifyDt).Format('yyyy-MM-dd') + '</span></p>'
                    }
                }
                $('.total-count').html(json.totalCount);
                //加载分页器
                $.burster($(".page-box"), parseInt(param.offset) || 0, json.totalCount || 0, 5, param.limit || 10);
            } else {
                str = '<div class="tb-wrong"><p class="wrong-msg">暂时没有信息</p></div>';
                $('.page-box').html('');
            }
        } else {
            str = '<div class="tb-wrong"><p class="wrong-msg">您搜索的新闻信息出错，<a href="javascript:void(0);" class="reload">请重试</a></p></div>';
            $('.page-box').html('');
        }
        $('.list-body .detail-body').html(str);
    };
    return {
        list: list
    }
}());
module.exports.Dom = Dom;