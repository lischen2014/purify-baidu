
// ==UserScript==
// @name         [自用]屏蔽百度热搜
// @namespace    https://github.com/lischen2014
// @version      0.0.1
// @description  一个屏蔽百度热搜的脚本
// @author       Leon
// @match        https://www.baidu.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    // Select the node that will be observed for changes
    // var targetNode = document.querySelector('body');
       var targetNode = document.querySelector('body');

    // Options for the observer (which mutations to observe)
    var config = { childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    var callback = function(mutationsList, observer) {
        for(var mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // 1. In Search Result page remove Hot Search SideBar in right panel
                var baiduReSouSideBar = document.getElementById("con-ceiling-wrapper");
                if (baiduReSouSideBar) {
                    baiduReSouSideBar.remove();
                    // Stop observing the target node when the element has been removed
                    // observer.disconnect();
                }

                // 2. In Baidu.com, remove the Hot Search box
                var baiduReSouInMainPage = document.getElementById("s-hotsearch-wrapper");
                if (baiduReSouInMainPage) {
                    baiduReSouInMainPage.remove();
                    // Stop observing the target node when the element has been removed
                    // observer.disconnect();
                }

                // 3. Remove Ads link
                var adsLink = document.querySelectorAll('[data-placeid]');
                if (adsLink) {
                    adsLink.remove();
                    // Stop observing the target node when the element has been removed

                }

                // 4. 

                observer.disconnect();
            }
        }
    };

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
})();