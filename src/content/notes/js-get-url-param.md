---
title: "js获取url参数方法"
slug: "js-get-url-param"
description: ""
tags: ["js"]
created: "2018-08-28"
updated: "2018-08-28"
---
```js
export let getUrlParam = (name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)

  if (r != null) {
    return decodeURI(r[2])
  } else {
    return null
  }
}

```
