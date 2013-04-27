
# Young Person's Guide to YUI3
ypg2yui3
========

# Young Person's Guide to YUI3

by R. S. Doiel, <rsdoiel@gmail.com>
Updated: 2013-04-26


This is a gentle introduction to [YUI3][]. It does make a few assumptions-

* You have a passing knowledge of JavaScript, HTML, CSS
* A basic idea of how the web works
* Know how to install things on your computer


# Contents #

- [Getting Started](#getting started)
- [One](#one) The index.html file, getting YUI, getting it to do something
- [Two](#two) Taking actions based on mouse clicks
- [Three](#three) Taking actions based on keyboard commands
- [Four](#four) Taking actions based on touch
- [Five](#five) Using a YUI Modules
- [Six](#six) Getting data from someplace else
- [Seven](#seven) Responding based on URL parameters
- [Eight](#eight) Writing your own Modules
- [Nine](#nine) Building a Simple Single, Page Application
- [Ten](#ten) Should you use YUI for that?
    * If HTML can do it, usc HTML
    * If CSS can do it, use CSS
- [Eleven](#eleven) Finding helpful YUI3 Modules

## Getting started

### What you're need

The typical web developer setup is a computer, a web browser, a text editor and a web server.
More specifially you can use either a Linux box, a Mac, Windows PC, or even a Raspberry Pi. You'll also
need a web browser (e.g. Firefox), an editor (e.g. Adobe Brackets or Scripted Editor), 
and the web server (e.g. httpster, Apache or NginX).  I happen to use a Mac, Firefox or Chrome web browser, 
Adobe Brackets and httpster as my webserver. My setup should run equally well on a Mac or Windows PC. I
also have been known to use a Raspberry Pi, Firefox (iceweasel), Scripted Editor and httpster.


### Using my setup

You only need the general setup to follow along but if you'd like to use what I used these instructions
are for you.

1) Turn on your computer :-)
2) Download and install the latest [Firefox](http://www.mozilla.org), click on the download button and follow the instructions
3) Install Adobe Brackets
4) Install [NodeJS](http://nodejs.org), click the download button and follow the instructions
5) [httpster](https://github.com/SimbCo/httpster), follow the instructions in the "README.md"

## One

First, YUI3 is loaded from the web page.  That means you need to have a working
web server. I recomment creating a folder where you're going to put your
site and using httpster turn that folder into a web site.  Here's
the sequence of steps I use to get started. On my Mac I ran these commands
from the Terminal and already had NodeJS, my text editor and httpster
installed.

```Shell
     mkdir Sandbox
     cd Sandbox
     touch index.html
     httpster
```

At this point httpster is serving up any content it finds in Sandbox folder. In
this specific case an empty index.html file.

Edit index.html to include the following-

```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Young Person's Guide to YUI3</title>
        </head>
        <body>
            <header>Young Person's Guide to YUI3</header>
            <section>
                <h1>I'm waking up</h1>
            </section>
            <footer>
            Yippee!
            </footer>
        <!-- Load YUI3 from the Yahoo CDN -->
        <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
        <script>
            /* Now we're going to start up YUI3 and change the h1's content. */
            YUI().use("node", function (Y) {
                Y.one("h1").set("text", "Hello World!");
            });
        </script>
        </body>
    </html>
```

So there. You've use YUI3 to change the contents of an H1 and written the proverbial "Hello World" example.




## Two

## Three

## Four

## Five

## Six

## Seven

## Eight

## Nine

## Ten

## Eleven



[YUI3]: http://yuilibrary.com YUI3 was at version 3.10.0 at the time this article was written
