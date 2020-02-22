/*
function send_mouse_event(event_name, receiver) {
    var event = new MouseEvent(event_name, {
        view: window,
        bubbles: true,
        cancelable: true
    });
    receiver.dispatchEvent(event);
}

function send_key(key_char, receiver){
    var key_down = new KeyboardEvent("keydown", {
        "key": "1",
        "code": "Numpad1",
    });
    receiver.dispatchEvent(key_down);
    var key_up = new KeyboardEvent("keyup", {
        "key": "1",
        "code": "Numpad1",
    });
    receiver.dispatchEvent(key_up);
    var key_press = new KeyboardEvent("keypress", {
        "key": "1",
        "code": "Numpad1",
    });
    receiver.dispatchEvent(key_press);
}

var account_list = [
    {
        "account_name": "",
        "password": ""
    }
];
var password_signin = document.querySelectorAll(`div.SignFlow-tab`)[1];
password_signin.click();
var mobile_account = document.querySelectorAll(`input.Input`)[0];
send_mouse_event(mobile_account);
send_key("1", mobile_account);

mobile_account.click();
mobile_account.value = "";
var pwd_account = document.querySelectorAll(`input.Input`)[1];
pwd_account.click();
pwd_account.value = "";
var login_btn = document.querySelectorAll(`button.SignFlow-submitButton[type='submit']`)[0];


login_btn.click();

*/
// ==UserScript==
// @name         知乎点赞
// @namespace    http://www.github.com/my-captain/
// @version      0.1
// @description  知乎点赞
// @author       zliu.Elliot
// @match        https://www.zhihu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.onload = function(){
        let url_list_for_star = [
            "https://www.zhihu.com/question/19781253/answer/12942611",
            "https://www.zhihu.com/question/19781253/answer/1031114428",
            "https://www.zhihu.com/question/19781253/answer/1029087937",
            "https://www.zhihu.com/question/19781253/answer/993230430",
            "https://www.zhihu.com/question/19781253/answer/992813633",
            "https://www.zhihu.com/question/19781253/answer/991996657",
            "https://www.zhihu.com/question/19781253/answer/993816848",
            "https://www.zhihu.com/question/19781253/answer/993904079",
            "https://www.zhihu.com/question/19781253/answer/998894036",
        ];

        let local_storage_key = "zhihu_url_list";

        /**
         * 获取下一条需要点赞的链接
         * @returns {*}
         */
        function get_next_url(){
            let current_progress = null;
            current_progress = localStorage.getItem(local_storage_key);
            if (current_progress != null){
                // 已开始点赞
                let list_has_starred = JSON.parse(current_progress);
                let url_stand_by = url_list_for_star.filter(item=>!list_has_starred.includes(item));
                if (url_stand_by != null && url_stand_by.length > 0) {
                    // 还有未点赞的连接
                    let next_url = url_stand_by[0];
                    list_has_starred.push(next_url);
                    localStorage.setItem(local_storage_key, JSON.stringify(list_has_starred));
                    return next_url;
                } else {
                    // 已全部点赞完成
                    window.alert("已全部点赞完成");
                    return null;
                }
            } else {
                // 从localStorage中未读到缓存,说明刚刚开始点赞
                let next_url = url_list_for_star[0];
                let list_has_starred = [next_url];
                localStorage.setItem(local_storage_key, JSON.stringify(list_has_starred));
                return next_url;
            }
        }

        function star_this_answer(){
            let star_btn = document.querySelectorAll(`span > button.Button.VoteButton.VoteButton--up`)[0];
            star_btn.style.color = "white";
            star_btn.style.backgroundColor = "red";
            star_btn.style.webkitTransform = "1.1";
            star_btn.style.boxShadow = "red 0 0 12px 0";
            let msg_box = document.createElement("div");
            msg_box.innerText = "2s后将点赞此条答案";
            msg_box.style.backgroundColor = "red";
            msg_box.style.color = "white";
            msg_box.style.width = "600px";
            msg_box.style.height = "30px";
            msg_box.style.left = "50px";
            msg_box.style.position = "absolute";
            document.body.appendChild(msg_box);
            msg_box.style.top = star_btn.offsetTop + "px";
            window.setTimeout(star_handler, 2000);
        }

        function star_handler(){
            let star_btn = document.querySelectorAll(`span > button.Button.VoteButton.VoteButton--up`)[0];
            star_btn.click();
            let next_url = get_next_url();
            if (next_url != null)
                window.location = next_url;
        }

        window.setTimeout(star_this_answer, 3000);
    };
})();