/**
 * Created by Jeremy on 2016/11/24.
 */
"use strict";

(function ($) {
    /**
     * 生成分页器
     * @param ele 需要添加分页器的元素
     * @param offset 偏移量，即从第data-offset开始
     * @param length 总记录条数
     * @param showPages 分页器显示的页数，超过则隐藏多余的页
     * @param rows 每页显示的记录条数
     */
    $.burster = function (ele, offset, length, showPages, rows) {
        offset = offset ? parseInt(offset) : 0;
        //将分页器装入table中
        if (length && length > offset) {
            var pageHtml = ""
                , ass = ""//清空需要装入的html
                , beforePages = Math.ceil(offset / rows)//需要显示的前页数/当前页
                , afterPages = Math.ceil((length - offset ) / rows)//需要显示的后页数
                , pages = Math.ceil(length / rows) //总页数
                , k = 0;
            //alert("总页数" + pages + " 前页数 " + beforePages + " 后页数 " + afterPages);
            //若页数小于showPages页，则全部显示
            if (pages >= 0 && pages <= showPages) {
                for (k = 0; k < pages; k++) {
                    if (k == beforePages) {
                        pageHtml += "<li class='active' ><a>" + (k + 1) + "</a></li>";
                    } else {
                        pageHtml += "<li><a class='pages' data-offset='" + (k * rows) + "'>" + (k + 1) + "</a></li>";
                    }
                }
            } else if (pages > showPages) {//总页数大于showPages页
                if (beforePages <= Math.ceil(showPages / 2) && afterPages > showPages + 1) {
                    for (k = 0; k < showPages; k++) {
                        if (k == beforePages) {
                            pageHtml += "<li class='active' ><a>" + (k + 1) + "</a></li>";
                        } else {
                            pageHtml += "<li><a class='pages' data-offset='" + (k * rows) + "'>" + (k + 1) + "</a></li>";
                        }
                    }
                    pageHtml += "<li><a class='pages' data-offset='" + ((pages - 1) * rows) + "'>..." + pages + "</a></li>";
                } else if (beforePages <= Math.ceil(showPages / 2) && afterPages == showPages + 1) {
                    for (k = 0; k < showPages - 1; k++) {
                        if (k == beforePages) {
                            pageHtml += "<li class='active' ><a>" + (k + 1) + "</a></li>";
                        } else {
                            pageHtml += "<li><a class='pages' data-offset='" + (k * rows) + "'>" + (k + 1) + "</a></li>";
                        }
                    }
                    pageHtml += "<li><a class='pages' data-offset='" + ((pages - 1) * rows) + "'>..." + pages + "</a></li>";
                } else if (beforePages <= Math.ceil(showPages / 2) && afterPages <= showPages) {
                    for (k = 0; k < showPages - 1; k++) {
                        if (k == beforePages) {
                            pageHtml += "<li class='active' ><a>" + (k + 1) + "</a></li>";
                        } else {
                            pageHtml += "<li><a class='pages' data-offset='" + (k * rows) + "'>" + (k + 1) + "</a></li>";
                        }
                    }
                    pageHtml += "<li><a class='pages' data-offset='" + ((pages - 1) * rows) + "'>..." + pages + "</a></li>";
                } else if (beforePages > Math.ceil(showPages / 2) && beforePages <= showPages && afterPages > showPages) {
                    pageHtml += "<li><a class='pages' data-offset='0'>1...</a></li>";
                    for (k = beforePages - Math.ceil(showPages / 2) + 1; k < beforePages + Math.ceil(showPages / 2); k++) {
                        if (k == beforePages) {
                            pageHtml += "<li class='active' ><a>" + (k + 1) + "</a></li>";
                        } else {
                            pageHtml += "<li><a class='pages' data-offset='" + (k * rows) + "'>" + (k + 1) + "</a></li>";
                        }
                    }
                    pageHtml += "<li><a class='pages' data-offset='" + ((pages - 1) * rows) + "'>..." + pages + "</a></li>";
                } else if (beforePages > showPages && afterPages > showPages) {
                    pageHtml += "<li><a class='pages' data-offset='0'>1...</a></li>";
                    for (k = beforePages - Math.ceil(showPages / 2) + 1; k < beforePages + Math.ceil(showPages / 2); k++) {
                        if (k == beforePages) {
                            pageHtml += "<li class='active' ><a>" + (k + 1) + "</a></li>";
                        } else {
                            pageHtml += "<li><a class='pages' data-offset='" + (k * rows) + "'>" + (k + 1) + "</a></li>";
                        }
                    }
                    pageHtml += "<li><a class='pages' data-offset='" + ((pages - 1) * rows) + "'>..." + pages + "</a></li>";
                } else if (beforePages > Math.ceil(showPages / 2) && beforePages <= pages && afterPages <= showPages && afterPages > Math.ceil(showPages / 2) + 1) {
                    pageHtml += "<li><a class='pages' data-offset='0'>1...</a></li>";
                    for (k = beforePages - Math.ceil(showPages / 2) + 1; k < beforePages + Math.ceil(showPages / 2); k++) {
                        if (k == beforePages) {
                            pageHtml += "<li class='active' ><a>" + (k + 1) + "</a></li>";
                        } else {
                            pageHtml += "<li><a class='pages' data-offset='" + (k * rows) + "'>" + (k + 1) + "</a></li>";
                        }
                    }
                    pageHtml += "<li><a class='pages' data-offset='" + ((pages - 1) * rows) + "'>..." + pages + "</a></li>";
                } else if (beforePages > pages && afterPages <= showPages && afterPages > Math.ceil(showPages / 2) + 1) {
                    pageHtml += "<li><a class='pages' data-offset='0'>1...</a></li>";
                    for (k = beforePages - Math.ceil(showPages / 2) + 1; k < beforePages + Math.ceil(showPages / 2); k++) {
                        if (k == beforePages) {
                            pageHtml += "<li class='active' ><a>" + (k + 1) + "</a></li>";
                        } else {
                            pageHtml += "<li><a class='pages' data-offset='" + (k * rows) + "'>" + (k + 1) + "</a></li>";
                        }
                    }
                    pageHtml += "<li><a class='pages' data-offset='" + ((pages - 1) * rows) + "'>..." + pages + "</a></li>";
                } else if (beforePages > Math.ceil(showPages / 2) && afterPages <= Math.ceil(showPages / 2) + 1) {
                    pageHtml += "<li><a class='pages' data-offset='0'>1...</a></li>";
                    for (k = beforePages - Math.ceil(showPages / 2) + 1; k < pages; k++) {
                        if (k == beforePages) {
                            pageHtml += "<li class='active' ><a>" + (k + 1) + "</a></li>";
                        } else {
                            pageHtml += "<li><a class='pages' data-offset='" + (k * rows) + "'>" + (k + 1) + "</a></li>";
                        }
                    }
                }
            }
            //判断"首页"和"末页"是否可点击
            var firstPage, lastPage;
            if (offset == 0) {//此时首页无法点击
                firstPage = '<li class="disabled"><a class="pages" data-offset="0">首页</a></li>';
                lastPage = '<li><a class="pages" data-offset="' + parseInt(parseInt((length % rows == 0 ? (length - 1) : length) / rows) * rows) + '" >末页</a></li>';
            } else if ((offset + rows) >= length) {//此时末页无法点击
                firstPage = '<li><a class="pages" data-offset="0">首页</a></li>';
                lastPage = '<li class="disabled"><a class="pages" data-offset="' + parseInt(parseInt((length % rows == 0 ? (length - 1) : length) / rows) * rows) + '">末页</a></li>';
            } else {
                firstPage = '<li><a class="pages" data-offset="0">首页</a></li>';
                lastPage = '<li><a class="pages" data-offset="' + parseInt(parseInt((length % rows == 0 ? (length - 1) : length) / rows) * rows) + '">末页</a></li>';
            }
            //判断"上一页"和"下一页"是否存在
            var upPage, downPage;
            if (offset == 0 || (offset < rows && (offset % rows != 0))) {
                upPage = "<li class='disabled'><a class='pages' func='previous' data-offset='" + parseInt(offset) + "' >上页</a></li>"
            } else {
                upPage = "<li><a class='pages' func='previous' data-offset='" + (parseInt(offset) - parseInt(rows)) + "' >上页</a></li>";
            }
            if (offset >= (length - rows)) {
                downPage = "<li class='disabled'><a class='pages' func='next' data-offset='" + parseInt(offset) + "'>下页</a></li>"
            } else {
                downPage = "<li><a class='pages' func='next' data-offset='" + parseInt(parseInt(offset) + parseInt(rows)) + "'>下页</a></li>"
            }
            if (pages != 1) {
                //分页部分
                ass += "<div id='pager' class='pager-info'>" +
                    "<h6 id='result' class='pager-record'>共有<span>" + length + "</span>条记录</h6>" +
                    "<ul class='pagination'>" + firstPage + upPage + pageHtml + downPage + lastPage + "</ul></div>";
                //table中注入拼装的记录
                ele.html(ass);
            } else {//无法分页清空分页器
                ele.html('');
            }
        }
    }
}(jQuery));