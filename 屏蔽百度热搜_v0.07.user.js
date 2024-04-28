// ==UserScript==
// @name         【屏蔽广告】百度热搜屏蔽|百度增强|百度广告净化
// @namespace    https://github.com/lischen2014/purify-baidu
// @version      0.07
// @description  厌烦了恶心的百度热搜榜单和混杂在搜索结果里的广告？试试这个！
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

  // 功能：移除热搜和其他广告
  var removeHotSearchAndAds = function () {
    // 移除侧边栏的热搜框
    var baiduReSouSideBar = document.getElementById("content_right");
    if (baiduReSouSideBar) {
      baiduReSouSideBar.remove();
      console.log("搜索结果页侧边栏已关闭");
    }
    // 移除主页面的热搜框
    var baiduReSouInMainPage = document.getElementById("s-hotsearch-wrapper");
    if (baiduReSouInMainPage) {
      baiduReSouInMainPage.remove();
      console.log("主页热搜关键词已关闭");
    }

    // 延迟移除搜索结果页使用.c-row类的广告
    setTimeout(function () {
      var ads = document.querySelectorAll(".c-row");
      ads.forEach(function (ad) {
        ad.remove();
        console.log("已屏蔽默认搜索结果广告");
      });
    }, 500); // 延迟500毫秒移除广告
  };

  // 功能：移除特定广告
  var removeSpecificAds = function () {
    var candidates = document.querySelectorAll(
      "div.result.c-container.new-pmd"
    );
    candidates.forEach((candidate) => {
      let links = candidate.querySelectorAll("div > a");
      links.forEach((link) => {
        if (link.textContent.includes("广告")) {
          candidate.remove();
          console.log("已屏蔽含追加广告");
        }
      });
    });
  };

  // MutationObserver回调
  var observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length) {
        removeHotSearchAndAds();
        // 增强广告移除的调用，以应对动态加载的内容
        setTimeout(removeSpecificAds, 300); // 针对动态加载内容，稍后重试
      }
    });
  });

  observer.observe(targetNode, config);
})();
