---
title: "监听textarea的值的变化\"propertychange"
slug: "js-textarea-propertychange"
description: "js示例 jquery示例"
tags:
  - "js"
created: "2016-03-25"
updated: "2016-03-25"
---
js示例
``` js
<textarea onpropertychange="if(value.length>100) value=value.substr(0,100)"></textarea>
```

jquery示例
``` js
function funTestarea(){
  var $testarea = $(".textarea textarea");
  var $b = $(".textarea b");
  $testarea.on("input propertychange",function(){
    var $this = $(this);
    var strNum = $.trim($this.val()).length;
    if(strNum>100){
      $(this).val($(this).val().substr(0,100));
    }else {
      $b.text(strNum);
    }
  });
}
```