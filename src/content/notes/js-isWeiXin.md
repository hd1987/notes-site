---
title: "判断是否是微信内置浏览器"
slug: "js-isweixin"
description: ""
tags:
  - "js"
created: "2016-03-25"
updated: "2016-03-25"
---
``` js
function isWeiXin(){ 
  var ua = window.navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    return true;
  }else{
    return false;
  }
}

$(function(){
  if(isWeiXin()){
    $("body").html("微信打开");
  }else {
    $("body").html("其它浏览器打开");
  }
})
```