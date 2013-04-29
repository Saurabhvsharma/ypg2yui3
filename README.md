
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


[YUI3]: http://yuilibrary.com "YUI3 was at version 3.10.0 at the time this article was written"


# Contents #
- [Setting up](#setting up)
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


## Setting Up

### What you're need

The typical web developer setup is a computer, a web browser, a text editor and a web server.
More specifially you might choose to use a a Linux box, a Mac, a Windows PC, or even a 
Raspberry Pi. You'll also need a web browser (e.g. Firefox, Chrome, Safari, IE, or Opera),
an editor (e.g. [Adobe Brackets][], [Scripted Editor][], Coda, Textmate, ShiftEdit, Sublime Editor), 
and the web server (e.g. httpster, Apache or NginX).  I happen to use a Mac, Firefox or Chrome
web browser,  Adobe Brackets and httpster as my webserver at my day job. That setup should
run equally well on a Mac or Windows PC. I am writing this tutorial and examples at home on my
on a Raspberry Pi computer, using the "iceweasel" version of Firefox, typing this text in with
 Scripted Editor and using httpster as my web  server to test my examples.

[Adobe Brackets]: http://brackets.io "Adobe Brackets is a text editor written in JavaScript, CSS and HTML. It is free and open source."
[Scripted Editor]: https://github.com/scripted-editor/scripted "Like Brackets is is build from JavaScript, CSS and HTML and is also open source."

### A basic setup (Mac/Windows)

You only need the general setup to follow along but here's how to 
get going if you're working from a Mac or Windows PC.

1) Turn on your computer :-)
2) Download and install the latest [Firefox](http://www.mozilla.org), click on the download button and follow the instructions
3) Install [Adobe Brackets](http://brackets.io), follow their instructions
4) Install [NodeJS](http://nodejs.org), click the download button and follow the instructions
5) [httpster](https://github.com/SimbCo/httpster), follow the instructions in the "README.md"

If you can create/edit a plain text file, start your web server and browser then you are ready to begin.

## Getting Started

As this is a short work on using YUI3 library you need to know how to make it available on a web page. Fortunately
this is blessedly easy. You use a _script_ tag to include it from Yahoo's CDN. As a teaser let's make a simple
web page and use YUI3 to change the pages' title to "Hello World".

Build the first part of your HTML document as you normally would.

[getting-started.html](Sandbox/getting-started.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Getting Started</title>
        </head>
        <body>
            <h1>Getting Started</h1>
            <p>Now load YUI3 then update the title of the page and heading above.</p>
```

Now include YUI3 from Yahoo's CDN. We follow that by a small amount of JavaScript 
to change the contents of the _title_ element and _h1_.

[getting-started.html](Sandbox/getting-started.html)
```HTML
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <script>
                YUI().use("node", function (Y) {
                    Y.one("title").setHTML("Hello World");
                    Y.one("h1").setHTML("Hello World");
                });
            </script>
```

Finally close up the rest of your document normally.

[getting-started.html](Sandbox/getting-started.html)
```HTML
        </body>
    </html>
```

If you've used jQuery before you'll notice a similar pattern albiet with a couple mysterious bits added.

```HTML
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script>
    $(document).ready(function () {
        $("title").html("Hello World");
        $("h1").html("Hello World");
    });
    </script>
```
Both YUI3 and jQuery offer access to the HTML structure via CSS style selectors.  Typically in a YUI3 this is
done through the _Y_ object passed into the outer function, in jQuery this is done with the _$_ (i.e. dollar sign)
object. Part of making the transition from jQuery to YUI3 is understanding where and how they are similar. Inside 
the web page you'll find many parrallels between them.  Where YUI3 moves away from jQuery is embracing modularization
through composition. Your picture of YUI3 becomes more fully feature particularly when you look at its use across 
both browsers and server side in the NodeJS environment.  Now that you have YUI3 on the page we will focus there
first before venturing server side.


## One

Let me backup a bit now that you see how to get YUI3 on a web page.  Working through this tutorial has some
pre-requisites.  It is handle to have a web server, I suggest using _httpster_ which is available as a NodeJS
package.  Second it is handle to have a structure to organize your code so I suggest the one below for the
purposes of this tutorial. If you're running on Linux/Unix then you can follow the reciept below or if you
are on a Mac or Windows machine use the _Finder_ or the _File Manage_ to create the structure suggested.
After you've created the folders create an empty _index.html_ file then start _httpster_ from that folder.

```Shell
     mkdir Sandbox
     cd Sandbox
     touch index.html
     httpster
```

At this point httpster is serving up any content it finds in Sandbox folder. In
this specific case an empty index.html file.

Edit index.html to include the following-

[index.html](Sandbox/index.html)
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

Refresh your web browser and now you should see the Hello World message in the middle area of the page.

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

