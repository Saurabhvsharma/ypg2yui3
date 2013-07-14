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


## Markdown to website

_ypg2yui3_ was written using in Markdown and uses [Markdown-Weave](http://github.com/rsdoiel/mweave)
to generate the code examples and HTML exercises pages from the primary text. This is
done through a _build.js_ NodeJS' package manager _npm_. To generate browser friendly version run---

```Shell
    npm install
    npm run-script build
```

This will render content to an _htdocs_ folder which you can use with your web server.

(e.g. using [httpster](https://github.com/SimbCo/httpster)
as your web server, this will serve your content at http://localhost:3333)

```shell
    httpster -d htdocs
```

[YUI3]: http://yuilibrary.com "YUI3 is a JavaScript framework"


