---
title: "CommandLineTools reinstall"
slug: "terminal-xcode-select"
description: ""
tags: ["terminal", "cli"]
created: "2021-08-11"
updated: "2021-08-11"
---
```
xcode-select --print-path
# in my case /Library/Developer/CommandLineTools

# the next line deletes the path returned by the command above
sudo rm -rf $(xcode-select --print-path)

# install them (again) if you don't get a default installation prompt
xcode-select --install
```
