// ==UserScript==
// @name         search weibo text and image
// @version      3.0
// @author       Mr.Robot
// @include       http://s.weibo.com/weibo/*
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
    console.log("array = " + array);

    function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    $(window).on("load", function() {
        if(location.href.search("page=")==-1){
            var confirm_clear = confirm("是否清空缓存数据");
            if (confirm_clear) {
                localStorage.clear();
            }
        }
        if (document.querySelector("input[node-type='yzm_input']")) {
            console.log("验证码了");
            return false;
        }
        var keyword_from_search = $(".searchInp_form").eq(0).val();
        console.log(keyword_from_search);
        $(".feed_lists").find(".WB_cardwrap").not(".WB_notes").each(function() {
            var is_forward = $(this).find("div").eq(0).attr("isforward");
            if(is_forward){
                // 内容部分
                var $content = $(this).find(".content");
                var user_name = $content.find(".feed_content.wbcon").find(".W_texta.W_fb").attr("nick-name");
                var text = $content.find(".feed_content.wbcon").find(".comment_txt").text();
                text = $.trim(text);
                var url = "http:" + $content.find(".feed_from").last().find('a').eq(0).attr("href");
                // var time = $content.find(".feed_from").find('a').eq(0).attr("title");
                var time = $content.find(".feed_from").last().find('a').eq(0).attr("date");
                time = new Date(parseInt(time)).toLocaleString();
                var from = $content.find(".feed_from").last().find('a').eq(1).text();
                var topics = [];
                $content.find(".a_topic").each(function() {
                    topics.push($(this).text().slice(1, -1));
                });
                var place = null;
                if ($content.find(".icon_cd_place").length !== 0) {
                    place = $content.find(".icon_cd_place").parents(".W_btn_tag").attr("title");
                }
                var emojis = [];
                $content.find(".W_img_face").each(function() {
                    emojis.push($(this).attr("title").slice(1, -1));
                });

                var $meta = $(this).find(".feed_action_info").last().find("li");
                // var $meta = $(this).find(".feed_action_info").find("li");
                var favorite = $meta.find("a[action-type='feed_list_favorite']").find("em").text() || 0;
                var forwar = $meta.find("a[action-type='feed_list_forward']").find("em").text() || 0;
                var comment = $meta.find("a[action-type='feed_list_comment']").find("em").text() || 0;
                var like = $meta.find("a[action-type='feed_list_like']").find("em").text() || 0;

                var $pic_section = $content.find(".WB_media_a");

                var pics = [];
                if ($pic_section.length !== 0) {
                    $pic_section.find(".WB_pic").find("img").each(function() {
                        var thumb_image_url = $(this).attr("src");
                        var big_image_url = thumb_image_url.replace(/square|thumbnail/, 'bmiddle');
                        pics.push(big_image_url);
                    });
                }
                var hash = {
                    keyword_from_search: keyword_from_search,
                    user_name: user_name,
                    content: text,
                    topics: topics,
                    place: place,
                    emojis: emojis,
                    pics: pics,
                    url: url,
                    time: time,
                    from: from,
                    favorite: favorite,
                    forward: forwar,
                    comment: comment,
                    like: like
                };
            } else {
                // 内容部分
                var $content = $(this).find(".content");
                var user_name = $content.find(".W_texta.W_fb").attr("title");
                var text = $content.find(".comment_txt").contents().text();
                text = $.trim(text);
                var url = "http:" + $content.find(".feed_from").find('a').eq(0).attr("href");
                // var time = $content.find(".feed_from").find('a').eq(0).attr("title");
                var time = $content.find(".feed_from").find('a').eq(0).attr("date");
                time = new Date(parseInt(time)).toLocaleString();
                var from = $content.find(".feed_from").find('a').eq(1).text();
                var topics = [];
                $content.find(".a_topic").each(function() {
                    topics.push($(this).text().slice(1, -1));
                });
                var place = null;
                if ($content.find(".icon_cd_place").length !== 0) {
                    place = $content.find(".icon_cd_place").parents(".W_btn_tag").attr("title");
                }
                var emojis = [];
                $content.find(".W_img_face").each(function() {
                    emojis.push($(this).attr("title").slice(1, -1));
                });

                var $meta = $(this).find(".feed_action_info").find("li");
                var favorite = $meta.find("a[action-type='feed_list_favorite']").find("em").text() || 0;
                var forwar = $meta.find("a[action-type='feed_list_forward']").find("em").text() || 0;
                var comment = $meta.find("a[action-type='feed_list_comment']").find("em").text() || 0;
                var like = $meta.find("a[action-type='feed_list_like']").find("em").text() || 0;

                var $pic_section = $content.find(".WB_media_a");

                var pics = [];
                if ($pic_section.length !== 0) {
                    $pic_section.find(".WB_pic").find("img").each(function() {
                        var thumb_image_url = $(this).attr("src");
                        var big_image_url = thumb_image_url.replace(/square|thumbnail/, 'bmiddle');
                        pics.push(big_image_url);
                    });
                }
                var hash = {
                    keyword_from_search: keyword_from_search,
                    user_name: user_name,
                    content: text,
                    topics: topics,
                    place: place,
                    emojis: emojis,
                    pics: pics,
                    url: url,
                    time: time,
                    from: from,
                    favorite: favorite,
                    forward: forwar,
                    comment: comment,
                    like: like
                };
            }

            console.log(hash);
            if (text.search(keyword_from_search) != -1 || text.search(keyword_from_search.toLowerCase()) != -1) {
                console.log(keyword_from_search);
                console.log(hash);
                array.push(hash);
            }
        });
        function click_to_next() {
            document.getElementsByClassName("next")[0].click();
        }
        var data = localStorage.getItem("data");
        data = JSON.parse(data);
        data = (data == null) ? array : (data.concat(array));
        localStorage.setItem("data",  JSON.stringify(data));
        console.log(JSON.stringify(data));
        if ($(".next").contents().text() != "") {
            console.log("正在翻页");
            setTimeout(click_to_next(), 5000);
        } else{
            var confirm_save = confirm("是否导出数据");
            if (confirm_save) {
                var file_name = "weibo-" + keyword_from_search + ".json";
                var blob = new Blob([localStorage.getItem("data")], {type: "text/plain;charset=utf-8"});
                saveAs(blob, file_name, true);
                localStorage.clear();
            }
        }
    });
})();

