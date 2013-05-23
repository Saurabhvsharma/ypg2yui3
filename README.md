ypg2yui3
========

# Young Person's Guide to YUI3

by R. S. Doiel, <rsdoiel@gmail.com>

This is a gentle introduction to [YUI3][]. It does make a few assumptions-

* You have a basic knowledge of JavaScript, HTML, CSS
* A basic idea of how the web works

## About this work

Young Person's Guide to YUI3 is a longform article designed to be read as an 
electronic text (e.g. via the web or ePub). The primary corpous is in 
[Young-Persons-Guide-to-YUI3.md](Young-Persons-Guide-to-YUI3.md).

## Markdown to website or ePub

_ypg2yui3_ was written using in Markdown and uses [Markdown-Weave](http://github.com/rsdoiel/mweave)
to generate the code examples and HTML exercises pages from the primary text. This is
done through a _build.js_ NodeJS script. To generate browser friendly version run---

```Shell
    npm run-script build.js
```

This will render content to an _htdocs_ folder which you can use with your web server. It will
also generate an ePub document in eBook folder.



