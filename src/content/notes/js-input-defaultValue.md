---
title: "input默认提示文字"
slug: "js-input-defaultvalue"
description: ""
tags:
  - "js"
created: "2016-03-25"
updated: "2016-03-25"
---
``` js
//input默认提示文字
$('.input_text_val').bind({ 
focus:function(){ 
	if (this.value == this.defaultValue){ 
		this.value="";
	} 
}, 
blur:function(){ 
	if (this.value == ""){ 
		this.value = this.defaultValue; 
	} 
} 
})
```