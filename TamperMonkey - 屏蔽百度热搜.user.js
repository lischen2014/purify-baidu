
// ==UserScript==
// @name         屏蔽百度热搜
// @namespace    https://github.com/lischen2014/purify-baidu
// @version      0.01
// @description  一个屏蔽百度热搜的脚本
// @author       Leon
// @match        https://www.baidu.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

       var targetNode = document.querySelector('body');

    var config = { childList: true, subtree: true };

    var callback = function(mutationsList, observer) {
        for(var mutation of mutationsList) {
            if (mutation.type === 'childList') {
                var baiduReSouSideBar = document.getElementById("con-ceiling-wrapper");
                if (baiduReSouSideBar) {
                    baiduReSouSideBar.remove();
                }

                var baiduReSouInMainPage = document.getElementById("s-hotsearch-wrapper");
                if (baiduReSouInMainPage) {
                    baiduReSouInMainPage.remove();
                }

                var adsLink = document.querySelectorAll('[data-placeid]');
                if (adsLink) {
                    adsLink.remove();
                }
                observer.disconnect();
            }
        }
    };

    var observer = new MutationObserver(callback);

    observer.observe(targetNode, config);
})();