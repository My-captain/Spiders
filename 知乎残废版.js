// ==UserScript==
// @name         知乎Spider
// @version      0.1
// @author       Mr.Robot
// @include       https://www.zhihu.com/search?*
// @require       http://apps.bdimg.com/libs/jquery/1.9.1/jquery.min.js
// @require       http://underscorejs.org/underscore-min.js
// ==/UserScript==

(function() {
    'use strict';

    $(window).on("load", function() {
        if (location.href.search("page=") == -1) {
            var confirm_clear = confirm("是否清空缓存数据");
            if (confirm_clear) {
                localStorage.clear();
            }
        }
        // 获取本次搜索的关键字
        var keyword_from_search = location.href.split("q=")[1];
        var index = 0;
        window.addEventListener("storage", function() {
            if (localStorage.getItem("isScrollEnd") == "true") {
                localStorage.setItem("isScrollEnd", false);
                console.log("滚动结束，开始爬取回答页面");
                localStorage.setItem("isSpiderEnd", "false");
                $(".Card").not(".SearchSections").find(".List").find(".List-item").each(function(i, value) {
                    if (i == index) {
                        var url = $(this).find(".ContentItem-title").find("a").attr("href");
                        url = url;
                        index++;
                        console.log("正在爬取第" + index + "个问题");
                        window.open(url);
                        return false;
                    }
                });
            }
        });
        window.addEventListener("storage", function() {
            if (localStorage.getItem("isSpiderEnd") == "true") {
                localStorage.setItem("isSpiderEnd", false);
                $(".Card").not(".SearchSections").find(".List").find(".List-item").each(function(i, value) {
                    if (i == index) {
                        var url = $(this).find(".ContentItem-title").find("a").attr("href");
                        url = url;
                        index++;
                        console.log("正在爬取第" + index + "个问题");
                        window.open(url);
                        return false;
                    }
                });
            }
        });
    });
})();

