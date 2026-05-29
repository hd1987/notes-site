---
title: "js focus end"
slug: "js-focus-end"
description: ""
tags:
  - "js"
created: "2018-10-16"
updated: "2018-10-16"
---
```js
export let setFocus = (target) => {
  let t = jQuery(target).val()
  jQuery(target).val('').focus().val(t)
}
```

```js
setFocus('input')
```
