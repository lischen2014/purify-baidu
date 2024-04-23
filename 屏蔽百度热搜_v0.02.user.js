// ==UserScript==
// @name         屏蔽百度热搜
// @namespace    https://github.com/lischen2014/purify-baidu
// @version      0.02
// @description  一个屏蔽百度热搜的脚本
// @author       Leon
// @match        https://www.baidu.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  var targetNode = document.querySelector("body");
  var config = { childList: true, subtree: true };
  var hotSearchClosed = false; // 添加一个标志来追踪热搜是否已关闭

  var callback = function (mutationsList, observer) {
    var baiduReSouSideBar = document.getElementById("con-ceiling-wrapper");
    if (baiduReSouSideBar) {
      baiduReSouSideBar.remove();
      console.log("热搜榜单侧边栏已关闭");
      observer.disconnect(); // 成功关闭后断开观察器
      return;
    }

    var baiduReSouInMainPage = document.getElementById("s-hotsearch-wrapper");
    if (baiduReSouInMainPage) {
      baiduReSouInMainPage.remove();
      console.log("s-hotsearch-wrapper removed");
    }

    var adsLinks = document.querySelectorAll("[data-placeid]");
    adsLinks.forEach(function (link) {
      link.remove();
    });

    // 尝试点击关闭热搜的链接，只有当它未被成功关闭时
    var tryClickCloseHotSearch = function () {
      if (!hotSearchClosed) {
        // 检查热搜是否已被关闭
        var closeHotSearchLink = document.querySelector(
          "a.s-set-hotsearch.set-hide"
        );
        if (closeHotSearchLink) {
          closeHotSearchLink.click();
          hotSearchClosed = true; // 标记为已关闭
          console.log("首页下方热搜已关闭");
        } else {
          setTimeout(tryClickCloseHotSearch, 1000); // 如果未找到链接，则1秒后重试
        }
      }
    };
    tryClickCloseHotSearch(); // 初始尝试点击关闭热搜
  };

  var observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
})();
