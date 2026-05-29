---
title: "Query中阻止事件冒泡方式"
slug: "js-stoppropagation"
description: ""
tags: ["js"]
created: "2016-03-25"
updated: "2016-03-25"
---
``` js
//event.stopPropagation();
$("#div1").mousedown(function(event){
	event.stopPropagation();
})
```