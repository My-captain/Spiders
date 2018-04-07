// ==UserScript==
// @name         豆瓣小组
// @version      1.0
// @author       Mr.Robot
// @include       https://www.douban.com/group/search?*
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
        var index;
        // if (!location.href.match(/page=\d+/) || location.href.match(/page=1/)) {
        if ((location.href.search("start=")==-1)) {
            var confirm_clear = confirm("是否清空缓存数据");
            if (confirm_clear) {
                localStorage.clear();
                // index = 0;
                // localStorage.setItem("index", index);
            }
        }

        // 获取搜索框的内容,也就是本次搜索的关键字
        var keyword_from_search = $("#inp-query").attr("value");
        console.log(keyword_from_search);
        // localStorage.setItem("keyword_from_search", keyword_from_search);
        // localStorage.setItem("result_list_url", location.href);
        // index = Number(localStorage.getItem("index"));

        // var flag = true;// 当页数据是否爬完
        $(".article").find(".topics").find(".olt").find(".pl").each(function(i, value) {
            // if (i == index) {
                // flag = false;
                var time = $(this).find(".td-time").attr("title");
                var reply = $(this).find(".td-reply").contents().text();
                // localStorage.setItem("time", time);
                // localStorage.setItem("reply", reply);
                var title = $(this).find(".td-subject").contents().text();
                var url = $(this).find(".td-subject").find("a").attr("href");
                // window.location = url;
                var user_name = $(this).find("td").not(".td-subject").not(".td-time").not(".td-reply").contents().text();

                var hash = {
                    keyword_from_search: keyword_from_search,
                    user_name: user_name,
                    title: title,
                    time: time,
                    reply: reply,
                    url: url
                };
                console.log(hash);
                if (title.search("keyword_from_search") != -1 || user_name.search(keyword_from_search) != -1) {
                    array.push(hash);
                }
            // }
        });

        function click_to_next() {
            console.log(document.getElementsByClassName("next")[0]);
            document.getElementsByClassName("next")[0].getElementsByTagName("a")[0].click();
        }
        var arr = localStorage.getItem("array");
        arr = JSON.parse(arr);
        arr = (arr == null) ? array : (arr.concat(array));
        localStorage.setItem("array", JSON.stringify(arr));
        console.log(JSON.stringify(arr));
        if ($(".next").find("a").contents().text() == "后页>") {
            // if (flag == true) {
                console.log("正在翻页");
                // index = Number(localStorage.getItem("index"));
                // localStorage.setItem("index", index - 49);
                setTimeout(click_to_next(), Math.random()*100+5000);
            // }
        } else{
            // if (flag) {
                var confirm_save = confirm("是否导出数据");
                if (confirm_save) {
                    var file_name = "豆瓣小组-" + keyword_from_search + ".json";
                    var blob = new Blob([localStorage.getItem("array")], {type: "text/plain;charset=utf-8"});
                    saveAs(blob, file_name, true);
                    localStorage.clear();
                }
            // }
        }
    });
})();

