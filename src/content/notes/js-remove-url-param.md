---
title: "js去除url指定参数"
slug: "js-remove-url-param"
description: ""
tags: ["js"]
created: "2022-12-13"
updated: "2022-12-13"
---
```js
/**
 * @description Remove the specified params
 * @param {array} params
 * @return {string} res
 */
const handleRemoveParam = (params = []) => {
  const { origin, pathname, search } = window.location;
  const arr = search.substring(1).split("&");
  let collect = [];

  arr.forEach((item, ind) => {
    params.forEach((param) => {
      if (item.includes(`${param}=`)) {
        collect = [...collect, ind];
      }
    });
  });

  for(let i = 0; i < collect.length; i++) {
    const item = i > 0 ? collect[i] - i : collect[i];
    arr.splice(item, 1);
  }

  const newSearch = arr.join('&');
  const res = newSearch ? origin + pathname + '?' + newSearch : origin + pathname;
  return res;
}

const str = handleRemoveParam(['bbb', 'aaa', 'token']);
console.log(str);
```
