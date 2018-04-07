// ==UserScript==
// @name         宝宝树
// @version      1.0
// @author       Mr.Robot
// @include       http://www.babytree.com/s.php?*
// @require       http://apps.bdimg.com/libs/jquery/1.9.1/jquery.min.js
// @require       http://underscorejs.org/underscore-min.js
// ==/UserScript==

(function() {
    'use strict';

    // FileSaver.js ==============********Starting********=====================
    var saveAs = saveAs ||
function(e) {
    if ("undefined" == typeof navigator || !/MSIE [1-9]\./.test(navigator.userAgent)) {
        var t = e.document,
        n = function() {
            return e.URL || e.webkitURL || e;
        },
        o = t.createElementNS("http://www.w3.org/1999/xhtml", "a"),
        r = "download" in o,
        i = function(e) {
            var t = new MouseEvent("click");
            e.dispatchEvent(t);
        },
        a = /Version\/[\d\.]+.*Safari/.test(navigator.userAgent),
        c = e.webkitRequestFileSystem,
        d = e.requestFileSystem || c || e.mozRequestFileSystem,
        u = function(t) { (e.setImmediate || e.setTimeout)(function() {
                throw t;
            },
            0);
        },
        s = "application/octet-stream",
        f = 0,
        l = 4e4,
        v = function(e) {
            var t = function() {
                "string" == typeof e ? n().revokeObjectURL(e) : e.remove();
            };
            setTimeout(t, l);
        },
        p = function(e, t, n) {
            t = [].concat(t);
            for (var o = t.length; o--;) {
                var r = e["on" + t[o]];
                if ("function" == typeof r) try {
                    r.call(e, n || e);
                } catch(i) {
                    u(i);
                }
            }
        },
        w = function(e) {
            return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], {
                type: e.type
            }) : e;
        },
        y = function(t, u, l) {
            l || (t = w(t));
            var y, m, S, h = this,
            R = t.type,
            O = !1,
            g = function() {
                p(h, "writestart progress write writeend".split(" "));
            },
            b = function() {
                if (m && a && "undefined" != typeof FileReader) {
                    var o = new FileReader();
                    return o.onloadend = function() {
                        var e = o.result;
                        m.location.href = "data:attachment/file" + e.slice(e.search(/[,;]/)),
                        h.readyState = h.DONE,
                        g();
                    },
                    o.readAsDataURL(t),
                    void(h.readyState = h.INIT);
                }
                if ((O || !y) && (y = n().createObjectURL(t)), m) m.location.href = y;
                else {
                    var r = e.open(y, "_blank");
                    void 0 === r && a && (e.location.href = y);
                }
                h.readyState = h.DONE,
                g(),
                v(y);
            },
            E = function(e) {
                return function() {
                    return h.readyState !== h.DONE ? e.apply(this, arguments) : void 0;
                };
            },
            N = {
                create: !0,
                exclusive: !1
            };
            return h.readyState = h.INIT,
            u || (u = "download"),
            r ? (y = n().createObjectURL(t), void setTimeout(function() {
                o.href = y,
                o.download = u,
                i(o),
                g(),
                v(y),
                h.readyState = h.DONE;
            })) : (e.chrome && R && R !== s && (S = t.slice || t.webkitSlice, t = S.call(t, 0, t.size, s), O = !0), c && "download" !== u && (u += ".download"), (R === s || c) && (m = e), d ? (f += t.size, void d(e.TEMPORARY, f, E(function(e) {
                e.root.getDirectory("saved", N, E(function(e) {
                    var n = function() {
                        e.getFile(u, N, E(function(e) {
                            e.createWriter(E(function(n) {
                                n.onwriteend = function(t) {
                                    m.location.href = e.toURL(),
                                    h.readyState = h.DONE,
                                    p(h, "writeend", t),
                                    v(e);
                                },
                                n.onerror = function() {
                                    var e = n.error;
                                    e.code !== e.ABORT_ERR && b();
                                },
                                "writestart progress write abort".split(" ").forEach(function(e) {
                                    n["on" + e] = h["on" + e];
                                }),
                                n.write(t),
                                h.abort = function() {
                                    n.abort(),
                                    h.readyState = h.DONE;
                                },
                                h.readyState = h.WRITING;
                            }), b);
                        }), b);
                    };
                    e.getFile(u, {
                        create: !1
                    },
                    E(function(e) {
                        e.remove(),
                        n();
                    }), E(function(e) {
                        e.code === e.NOT_FOUND_ERR ? n() : b();
                    }));
                }), b);
            }), b)) : void b());
        },
        m = y.prototype,
        S = function(e, t, n) {
            return new y(e, t, n);
        };
        return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ?
        function(e, t, n) {
            return n || (e = w(e)),
            navigator.msSaveOrOpenBlob(e, t || "download");
        }: (m.abort = function() {
            var e = this;
            e.readyState = e.DONE,
            p(e, "abort");
        },
        m.readyState = m.INIT = 0, m.WRITING = 1, m.DONE = 2, m.error = m.onwritestart = m.onprogress = m.onwrite = m.onabort = m.onerror = m.onwriteend = null, S);
    }
} ("undefined" != typeof self && self || "undefined" != typeof window && window || this.content);
"undefined" != typeof module && module.exports ? module.exports.saveAs = saveAs: "undefined" != typeof define && null !== define && null !== define.amd && define([],
function() {
    return saveAs;
});
    // FileSaver.js ==============***********end**********=====================
    window.array = [];
    $(window).on("load", function() {
        if (location.href.search("pg=")==-1 || $(".current").contents().text() == 1) {
            //var confirm_clear = confirm("是否清空缓存数据");
            //if (confirm_clear) {
                localStorage.setItem("array", null);
            //}
        }

        // 获取搜索框的内容,也就是本次搜索的关键字
        var keyword_from_search = $("#txtQ").attr("value");
        console.log(keyword_from_search);
        $(".search_item_area").find(".search_item").each(function() {
        	var title = $(this).find(".search_item_tit").find("a").contents().text();
            var url = $(this).find(".search_item_tit").find("a").attr("href");
            var brief_of_content = $(this).find(".search_item_cont").find("p").contents().text();
            var account = $(this).find(".search_item_info").find(".search_category").contents().text();
            var time;
            $(this).find(".search_item_info").find(".search_date").each(function(i, value){
                if(i == 0){
                    time = $(this).contents().text();
                }
            });
            var hash = {
                keyword_from_search: keyword_from_search,
                title: title,
                user_name: account,
                content: brief_of_content,
                url: url,
                time: time
            };
            console.log(keyword_from_search+"@"+title+"@"+typeof(brief_of_content)+"@"+url+"@"+account+"@"+time);
            if (title.search(keyword_from_search)!=-1 || brief_of_content.search(keyword_from_search)!=-1) {
                array.push(hash);
                console.log(keyword_from_search+"@"+title+"@"+brief_of_content+"@"+url+"@"+account+"@"+time);
            }
        });
        function get_next_button() {
            $(".pagejump").find("a").each(function(i, value) {
                if ($(this).contents().text() == "下一页") {
                    console.log("ok");
                    return true;
                }
            });
        }
        var arr = localStorage.getItem("array");
        arr = JSON.parse(arr);
        arr = (arr == null) ? array : (arr.concat(array));
        localStorage.setItem("array", JSON.stringify(arr));
        console.log(JSON.stringify(arr));
        var flag = false;
        $(".pagejump").find("a").each(function(i, value) {
            if ($(this).contents().text() == "下一页") {
                console.log("正在翻页");
                flag = true;
                window.location = $(this).attr("href");
            }
        });
        if (!flag) {
            //var confirm_save = confirm("是否导出数据");
            //if (confirm_save) {
            console.log("正在存储数据");
                var file_name = "babayTree-" + keyword_from_search + ".json";
                var blob = new Blob([localStorage.getItem("array")], {type: "text/plain;charset=utf-8"});
                saveAs(blob, file_name, true);
                console.log("正在清空缓存");
                localStorage.clear();
            //}
        }
    });
})();

