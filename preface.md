
# Young Person's Guide to YUI3 (draft 0)

by R. S. Doiel, <rsdoiel@gmail.com>
Updated: 2013-10-19


This is a gentle introduction to [YUI3][]. It does make a few assumptions-

* You have a basic knowledge of JavaScript, HTML, CSS
* A basic idea of how the web works
* You have an active connection to the internet

For a deeper dive into _YUI3_ I recommend
[Evan Goer](http://www.goer.org/)'s 
[YUI3 Cookbook](http://shop.oreilly.com/product/0636920013303.do). It has 
been the goto text for bootstrapping my understanding of _YUI3_. It is 
also a handy set of recipes for _YUI3_'s practical application.
Additionally the [YUILibrary](http://yuilibrary.com) website has the 
canonical documentation and you can read the source for _YUI3_ at 
[Github](https://github.com/yui/yui3) under _yui/yui3_.

1. [Google Groups](https://groups.google.com/forum/#!forum/yui-contrib)
2. IRC community on irc.freeenode.net under #yui.
3. [Stackexchange](http://stackoverflow.com/questions/tagged/yui3)
4. Use your favorite search terms like "yui3"


[YUI3]: http://yuilibrary.com "YUI3 was at version 3.13.0 at the time this article was written"


### What you'll need before you begin

The typical web developer setup is a computer, one or more web browser,
a _text_ editor and a web server.  Specific examples include--

+ Computers:
    - Mac, PC, Chromebook or Raspberry Pi
+ Web Browsers:
    - Firefox, Midori, Chrome, IE, Safari, or Opera 
+ Text Editors:
    - Adobe Brackets, nano, vi, or emacs
+ Web Servers:
    - httpster, Nginx or Apache

### A word about text editors

Most developers have opinions about text editors. Sometimes very 
strong opinions. I don't. Text editors are computer program. I tend 
to use the ones available to me. That isn't to say there aren't some 
helpful things to look for. One feature I really like is syntax 
highlighting.  It makes it much easier to read code quickly. Another is 
an integrated linting tool (e.g. [jslint](http://jslint.com)). I find 
both of these features to be helpful in spotting the sillier things 
I type.

If you don't have an editor you like may I suggest [Adobe Brackets][1].
They are both built from the same building blocks we use on the web -- 
HTML, CSS, JavaScript. That makes it easy to extend and improve to meet 
your own needs. They also come out of the box with syntax highlighting.

[1]: http://brackets.io "Adobe Brackets is a text editor written in JavaScript, CSS and HTML. It is free and open source."
[node]: http://nodejs.org "A JavaScript environment for building network, file system and other services"


### A word about Node

While this tutorial is focused on the web browser _YUI3_ also supports
[NodeJS](http://nodejs.org) (a.k.a. Node) as a first class platform. This
presents several nice opportunities when you move beyond the browser--

1. What you learn in the browser can be used server side
2. The _YUI3_ tool chain is Node based
3. [Mojito](http://developer.yahoo.com/cocktails/mojito/) is based on on _YUI3_ plus _Node_
4. Node runs on _Mac_,under _Windows_ and many _Unix_ systems (e.g. Intel and Arm based _Linux_)

I have found the little _Node_ webserver called 
[httpster](https://github.com/SimbCo/httpster) to be very help for 
front-end development. It makes serving content from your current working 
folder as easily as typing _httpster_. It is what I used in conjunction 
with a web browser to test the content of this article.


### Some useful links

+ [YUI Library](http://yuilibrary.com), the main YUI site
+ [YUI User Guides](http://yuilibrary.com/yui/docs/guides/)
+ [YUI at Github](http://github.com/yui/yui3), source code for YUI3
+ [Firefox](http://www.mozilla.org)
+ [Adobe Brackets](http://brackets.io)
+ [NodeJS](http://nodejs.org)
+ [httpster](https://github.com/SimbCo/httpster)
    + follow the instructions in the "README.md" to install

