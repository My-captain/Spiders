// ==UserScript==
// @name         weiboSpider
// @version      2.0
// @author       Mr.Robot
// @include       https://m.weibo.cn/*
// @require       http://apps.bdimg.com/libs/jquery/1.9.1/jquery.min.js
// @require       http://underscorejs.org/underscore-min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/mathjs/4.0.1/math.min.js
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

    function sleep(d){
        for(var t = Date.now();Date.now() - t <= d;);
    }

    window.array = [];
    console.log("array = " + array);

    $(window).on("load", function() {
        var confirm_save_i;
        var confirm_static;


        var containerid = location.href.split("containerid")[1];
        containerid = containerid.split("_-_")[0];
        for(var weibo_page = 6; weibo_page < 8; weibo_page++) {
            var url = "https://m.weibo.cn/api/container/getIndex?containerid" + containerid + "_-_WEIBO_SECOND_PROFILE_MORE_WEIBO" + "&page=" + weibo_page;
            // console.log(url);
            $.ajax({
                type: "get",
                url: url,
                cache: true,
                async: false,
                error: function (argument) {
                    // body...
                    console.log("failed");
                },
                success: function (data) {
                    var cards = data["data"]["cards"];
                    // console.log(cards);
                    // console.log(cards.length);
                    for (var i = 0; i < cards.length - 1; i++) {
                        // console.log("i..............."+i);
                        /*if (i>0) {
                            break;
                        }*/
                        var card = cards[i];

                        var url = card["scheme"];

                        // console.log(card);
                        card = card["mblog"];

                        var comments_count = card["comments_count"];
                        var raw_text = card["raw_text"];
                        if (card["raw_text"] == null) {
                            raw_text = card["text"];
                        }
                        var created_at = card["created_at"];
                        var attitudes_count = card["attitudes_count"];
                        var reposts_count = card["reposts_count"];

                        // console.log(card);
                        // continue;

                        if (card["retweeted_status"] != null) {
                            raw_text += "转发内容：";
                            raw_text += card["retweeted_status"]["text"];
                        }

                        var comment_user_array = [];

                        console.log(raw_text + ", " + reposts_count + "," + comments_count + "," + attitudes_count + "," + created_at);
                        for (var j = 1; j <= Math.ceil(reposts_count / 9); j++) {
                            /*if(i>1){
                                break;
                            }*/
                            var comment_url = "https://m.weibo.cn/api/comments/show?id=" + card["id"] + "&page=" + j;
                            // console.log(comment_url);
                            // 等待0.05~10.05秒进行评论翻页
                            sleep(Math.random() * 6000 + 500);
                            $.ajax({
                                type: "get",
                                url: comment_url,
                                cache: true,
                                async: false,
                                error: function (argument) {
                                    console.log(argument + "ERROR!!!!!!!!!");
                                },
                                success: function (comment_data) {
                                    // console.log(comment_data);
                                    if (comment_data["msg"] == "数据获取成功") {
                                        // console.log(comment_data);

                                        var comment_array = comment_data["data"]["data"];
                                        // console.log(comment_array);
                                        for (var comment_i = 0; comment_i < comment_array.length - 1; comment_i++) {
                                            var comment = comment_array[comment_i];
                                            // console.log(comment);
                                            var comment_text = comment["reply_text"];
                                            var comment_user_id = comment["user"]["id"];
                                            var comment_user = comment["user"]["screen_name"];
                                            var user_profile_url = comment["user"]["profile_url"].split("?uid=")[1];
                                            user_profile_url = "https://m.weibo.cn/api/container/getIndex?uid=" + user_profile_url + "&type=uid&" + "value=" + comment_user_id;
                                            // console.log(user_profile_url);
                                            // 等待0.05~10.05秒开始由评论card进入用户主页拿数据
                                            sleep(Math.random() * 2000 + 500);
                                            $.ajax({
                                                type: "get", url: user_profile_url, cache: true, async: false,
                                                error: function (argument) {
                                                    console.log("爬取评论用户信息时出错");
                                                },
                                                success: function (comment_user_info) {
                                                    // console.log(comment_user_info);
                                                    var featurecode = comment_user_info["data"]["scheme"].split("featurecode=")[1];
                                                    var luicode = comment_user_info["data"]["scheme"].split("luicode=")[1].split("&")[0];
                                                    var lfid = comment_user_info["data"]["tabsInfo"]["tabs"][1]["containerid"];
                                                    var containerid = comment_user_info["data"]["tabsInfo"]["tabs"][0]["containerid"];
                                                    var user_info_containerid = comment_user_info["data"]["tabsInfo"]["tabs"][0]["containerid"];
                                                    // console.log("https://m.weibo.cn/api/container/getIndex?uid=" + comment_user_id + "&luicode=" + luicode + "&lfid=" + lfid + "&featurecode=" + featurecode + "&type=uid&value=" + comment_user_id + "&containerid=" + containerid);
                                                    var user_info_url = "https://m.weibo.cn/api/container/getIndex?uid=" + comment_user_id + "&luicode=" + luicode + "&lfid=" + lfid + "&featurecode=" + featurecode + "&type=uid&value=" + comment_user_id + "&containerid=" + containerid;
                                                    $.ajax({
                                                        type: "get",
                                                        url: user_info_url,
                                                        cache: true,
                                                        async: false,
                                                        error: function (argument) {
                                                            console.log(argument + "爬取评论用户信息时出错");
                                                        },
                                                        success: function (user_info_data) {
                                                            var place = "";
                                                            var info = "";
                                                            // console.log(user_info_data);
                                                            var user_info_data_cards = user_info_data["data"]["cards"];
                                                            for (var card in user_info_data_cards) {
                                                                card = user_info_data_cards[card];
                                                                // console.log(card);
                                                                if (card["show_type"] == 2) {
                                                                    // console.log("ojbk");
                                                                    var card_group = card["card_group"];
                                                                    // console.log(card_group);
                                                                    var is_place_flag = false;
                                                                    for (var card_group_i in card_group) {
                                                                        card_group_i = card_group[card_group_i];
                                                                        // console.log(card_group_i);
                                                                        if (card_group_i["card_type"] == 41) {
                                                                            if (card_group_i["item_name"] == "所在地") {
                                                                                place = card_group_i["item_content"];
                                                                                // console.log(place);
                                                                                is_place_flag = true;
                                                                            } else if (card_group_i["item_name"] == "信息") {
                                                                                info = card_group_i["item_content"];
                                                                                // console.log(info);
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }

                                                            var hash = {
                                                                comment_user_name: comment_user,
                                                                place: place,
                                                                info: info
                                                            };
                                                            comment_user_array.push(hash);
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                                }
                            });
                        }
                        var hash = {
                            blog_text: raw_text,
                            reposts_count: reposts_count,
                            comments_count: comments_count,
                            attitudes_count: attitudes_count,
                            comment_array: comment_user_array
                        };
                        array.push(hash);
                        console.log(array);

                        // 等待0.05~0.06秒开始爬取下一个card中的数据
                        sleep(Math.random() * 100 + 500);
                    }
                }
            });

            // localStorage.setItem("data", )

            // 保存数据
            /*
            confirm_save_i = confirm("是否导出数据");
            if (confirm_save_i) {
                var file_name = "weibo-客户数据"+weibo_page+".json";
                var blob = new Blob([JSON.stringify(array)], {type: "text/plain;charset=utf-8"});
                saveAs(blob, file_name, true);
                //localStorage.clear();
            }
            */

        }

        // 保存数据
        confirm_static = confirm("是否导出数据");
        if (confirm_static) {
            var file_name = "weibo-客户数据.json";
            var blob = new Blob([JSON.stringify(array)], {type: "text/plain;charset=utf-8"});
            saveAs(blob, file_name, true);
            localStorage.clear();
        }

    });
})();

