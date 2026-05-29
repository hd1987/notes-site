---
title: "css控制 外层div高度未知 内层div高度100%"
slug: "css-interdiv"
description: "外层：div设置超出不显示， 内层：div底部内边距10000px，div底部外边距 10000px。"
tags: ["css"]
created: "2016-03-24"
updated: "2016-03-24"
---
外层：div设置超出不显示，
内层：div底部内边距10000px，div底部外边距-10000px。

``` css
.outerDiv { overflow:hidden;}
.interDiv { padding-bottom:10000px; margin-bottom:-10000px;}
```