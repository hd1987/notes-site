---
title: "css透明度设置opacity"
slug: "css-opacity"
description: ""
tags: ["css"]
created: "2016-03-24"
updated: "2016-03-24"
---
``` css
.opacity{
  filter:alpha(opacity=50);   /* IE */
  opacity:0.5;                /* 支持opacity的浏览器*/
  -moz-opacity:0.5;           /* 老版Mozilla */
  -khtml-opacity:0.5;         /* 老版Safari */
}
```
