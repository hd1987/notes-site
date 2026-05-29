---
title: "php提取文字并去除html标记，超出省略号表示"
slug: "php-cut-article"
description: ""
tags: ["php"]
created: "2016-06-20"
updated: "2016-06-20"
---
```php
function cutArticle($data) {
  $data=strip_tags($data);//去除html标记
  $pattern = "/&[a-zA-Z]+;/";//去除特殊符号
  $data=preg_replace($pattern,'',$data);
  $data = mb_strimwidth($data,0,150,'....','UTF-8');
  return $data;
}
```


