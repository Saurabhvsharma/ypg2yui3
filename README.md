ypg2yui3
========

# Young Person's Guide to YUI3

by R. S. Doiel, <rsdoiel@gmail.com>
Updated: 2013-04-26


This is a gentle introduction to [YUI3][]. It does make a few assumptions-

* You have a basic knowledge of JavaScript, HTML, CSS
* A basic idea of how the web works
* Know how to install things on your computer

For those who might be familiar with jQuery I'll point out the similarities
to speed you along.


For a much more complete look at YUI3 I recommend [Evan Goer](http://www.goer.org/)'s
[YUI3 Cookbook](http://shop.oreilly.com/product/0636920013303.do). It has been the goto
text for bootstrapping my own understanding of YUI3. It is also a handy set of recipes
for YUI3's practical application.  Additionally the [YUILibrary](http://yuilibrary.com)
website has the canonical documentation and you can read the source for YUI3 at
[Github](https://github.com/yui/yui3) under yui/yui3.

A note about using Google Search for learning YUI3. Right now, May 2013, the Google's search
algorhythm still ranks legacy YUI2 documentation higher than YUI3.  This can easily lead
to confusion. 


[YUI3]: http://yuilibrary.com "YUI3 was at version 3.10.0 at the time this article was written"


# Contents #
- [Preface](#preface) -- What you'll need to begin
- [Getting Started](#getting started) -- The minimum to pull YUI3 into the webpage
- [Selectors](#selectors) -- CSS selectors work the way you expect, but save those handles
- [innerHTML and Attributes](#innerhtml and attributes) -- Setting tag contents and attributes
- [Taking action](#taking action) -- mouse clicks, keyboard commands and touch
- [Elements](#elements) -- Creating, replacing and removing tags
- [Modules](#modules) -- Using modules
- [Going Remote](#going remote) -- Interacting with remote content via Y.io
- [Persistence](#persistence) -- Saving things for latter with StorageLite
- [Pushing Data](#pushing data) -- http GET, POST, PUT and DELETE
- [Making Modules](#making modules) -- make a simple module to parse url parameters
- [SPA](#spa) -- Building a Simple Single Page Application
- [Reminders](#reminders) -- Should you use YUI for that?
    * If HTML can do it, usc HTML
    * If CSS can do it, use CSS
- [Up Next](#up next) -- Finding helpful YUI3 Modules, documentation and examples


## Preface

### What you're need

The typical web developer setup is a computer, a web browser, a text editor and a web server.
Specific examples include--

* Computers:
    * a Mac, a Windows PC, a Linux Virtual Marchine or even a Raspberry Pi
* Web Browsers:
    * Firefox, Chrome, Safari, IE, or Opera
* Text Editors:
    * Adobe Brackets, Coda, Text Mate, Sublime Editor, ShiftEdit, vi, Emacs
* Web Servers:
    * Apache, NginX, Cherokee, Node, httpster (a Node based http server nice for development use)



## A word about text editors

Most developers have opinions about text editors. Sometimes very strong opinions. I don't.
They are just a computer program and I tend to use the ones available to me. That isn't to
say there aren't some helpful things to look for.  One feature I really like is syntax highlighting.
It makes it much easier to read code quickly. Another is an integrated linting tool (e.g.
[jslint](http://jslint.com) or [jshint](http://jshint.com)). I find both of these features to
be helpful in spotting the sillier things I type.

If you don't have an editor you like may I suggest [Adobe Brackets][] or [Scripted Editor][]. They
are both built from the same building blocks we use on the web -- HTML, CSS, JavaScript. That
makes it easy to extend and improve to meet your own needs. They also come out of the box
with syntax highlighting and jslint/jshint.


[Adobe Brackets]: http://brackets.io "Adobe Brackets is a text editor written in JavaScript, CSS and HTML. It is free and open source."
[Scripted Editor]: https://github.com/scripted-editor/scripted "Like Brackets is is build from JavaScript, CSS and HTML and is also open source."


### A word about NodeJS

While this tutorial is focused on _YUI3_ in the web browser _YUI3_ also supports
[NodeJS](http://nodejs.org) (a.k.a. Node) as a first class platform. This presents several
nice opportunities--

1) What you learn in the browser can be used server side
2) _YUI3_'s tool chain is Node based
3) [Mojito]() is based on on _YUI3_ plus _Node_
4) It runs on _Mac_, _Windows_ and many _Unix_ (e.g. Intel and Arm based _Linux_)

I've found the little _Node_ webserver called [httpster]() to be very convient in front-end
development.  It is worth a look too.

Finally I am also going to make the assumption you have an active 
connection to the internet.

### Some links

* [YUI Library](http://yuilibrary.com), the main YUI site
* [YUI at Github](http://github.com/yui/yui3), source code for YUI3
* [Firefox](http://www.mozilla.org)
* [Adobe Brackets](http://brackets.io)
* [NodeJS](http://nodejs.org)
* [httpster](https://github.com/SimbCo/httpster), follow the instructions in the "README.md" to install


## Getting Started

Let's setup a **Sandbox** for our work today.  We need to create the folder (i.e. directory in
Unix parlance) and change to it. This tutorial will assume all the documents we work on
(e.g. JavaScript files, HTML files) that are not _YUI_ itself are located there. It is also
assumed this is the root directory available on your development web server (e.g. if you're using
httpster that you started it up in the _Sandbox_ directory).

```SHELL
    mkdir Sandbox
    cd Sandbox
```

As this is a short work on using YUI3 library in the _browser_ you need to know how to make
it available on a webpage. Fortunately this is easy. You use a _script_ tag to include it
from Yahoo's CDN. As a teaser let's make a simple webpage and use YUI3 to change the
pages' _title_ to "Hello World" and the first _h1_ to "Yippee! It worked.".

Build the first part of your HTML document as you normally would.

[getting-started.html](getting-started.html)
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
to change the contents of the _title_ and _h1_ tags.

[getting-started.html](getting-started.html)
```HTML
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
```

Now add your own code using _YUI_.

[gitting-started.html](getting-started.html)
```HTML
            <script>
                YUI().use("node", function (Y) {
                    Y.one("title").setHTML("Hello World");
                    Y.one("h1").setHTML("Yippee! It worked.");
                });
            </script>
```

Finally close up the rest of your document normally.

[getting-started.html](getting-started.html)
```HTML
        </body>
    </html>
```

Save the file in your **Sandbox** folder as _getting-started.html_. Make sure
your web server is up in running (e.g. start up _httpster_). Point your web browser
at **getting-started.html** (e.g. http://localhost/getting-started.html assuming
you're running your local web server on port 80 and the **Sandbox** folder
is your root web directory)

You should now see your first _YUI3_ enabled web page.

### A Quick aside on **httpster**

In the **Sandbox** directory start _httpster_.

```SHELL
    httpster
```

It'll display a message about what port it is working on and what directory it is using to server
static content to the web.  When I started the command from my _Sandbox_ folder I saw this message--

```
   Starting Server on port 3333 from /home/rsdoiel/Sandbox

```

Port _3333_ isn't the standard web server port (i.e. not port _80_).  You'll need to include it
in the host portion of the URL.  For me the full URL looks like
[http://localhost:3333/getting-started.html](http://localhost:3333/getting-started.html). If you press
_Ctrl-C_ in the window where _httpster_ is running it will stop the web server. Reloading the URL
should then present you with "This webpage is not available" message. That lets you know the web server
has now stopped. _httpster_ starts fast so I commonly start and stop it frequently as needed.

### A quick comparison with jQuery

If you have used [jQuery]() before you'll notice a similar pattern
albiet with a couple mysterious bits added to the YUI3 version. Here's the jQuery version 
of the script tags.

```HTML
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script>
    $(document).ready(function () {
        $("title").html("Hello World");
        $("h1").html("Hello World");
    });
    </script>
```

Both YUI3 and jQuery offer access to the HTML structure via CSS style selectors.  Typically in YUI3 this is
done through the _Y_ object passed into the outer _use_ function, in jQuery this is done with the _$_ (i.e. dollar sign)
object often from the outer _ready_ function. Part of making the transition from jQuery to YUI3 is
understanding where and how they are similar. Inside the webpage you'll find many parrallels between them.
Where YUI3 moves away from jQuery is embracing modularization through composition. Additionally YUI3 targets
not just the browser but server side via support for Node.  This means code you write for the browser may also
be avaialble to run server side if you need it too.  In this tutorial we're going to focus on the browser 
side of things.


## Selectors

### Getting access to parts of a webpage

_YUI3_ like recent [DOM][] API improvements and _jQuery_ lets you use [CSS][] selectors to access parts of the
webpage you want to interact with.  This typically is by indentifing an element via an _id_ or _class_
attribute. You may also use CSS psuedo classes and element relationships to target a specific element in the
page (e.g. the _li_ contained in a _ul_ list). There is a cost to caculating where in the _DOM_ you're
going to work on. The best practice in both _jQuery_ and _YUI3_ is to save the reference if you need it more
than once. Here's an an example _script_ block for improving our first _getting-started.html_ example
where we're saving the DOM selector results.


```JavaScript
            <script>
                YUI().use("node", function (Y) {
                    var title = Y.one("title"),
                        h1 = Y.one("h1");
                    
                    title.setHTML("Hello World - improved.");
                    h1.setHTML("Yippee! I am more efficient.");
                });
            </script>
```

YUI3 provides two function that take a selector.  The first is _Y.one()_. It will give you the 
first element in the DOM matching that selector. In our example above that was _title_ and _h1_.  If
you had more than _h1_ it would only give the first _h1_ it found. Usually this is what you want.
Sometimes you want all the elements that have that selector. E.g. all the anchor tags in a page. 
To get that you use _Y.all()_.  That returns a list of elements. It is easiest to explain
by showing.  Let us create a short element with a list of links to YUI3 resources. Then
we'll update part of the page to indicate the links we found.

[selecting-all.html](selecting-all.html)
```JavaScript
    <!DOCTYPE html>
    <html>
        <head>
            <title>Y.all() Example</title>
        </head>
        <body>
            <ol>
                <li><a href="http://yuilibrary.com">YUI Library</a></li>
                <li><a href="http://github.com/yui/yui3">YUI3 on Github.com</a></li>
                <li><a href="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js">Seed File</a> for YUI3 at the CDN</li>
            </ol>
            <div id="results"></div>
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <script>
                YUI().use("node", function (Y) {
                    var all_anchors = Y.all("a"),
                        div_results = Y.one("#results"),
                        results = [];

                        all_anchors.each(function (anchor) {
                            // Grab the href from each anchor element and save it
                            // in the results.
                            results.push(anchor.get("href"));
                        });
                        // Now display the resultsin div.results
                        div_results.setHTML("The following links were found <em>" + results.join(", ") + "</em>");
                });
            </script>
        </body>
    </html>
```

[DOM] http://en.wikipedia.org/wiki/Document_Object_Model "The Object which the browser uses to allow access to parts of a webpage."
[CSS] http://en.wikipedia.org/wiki/CSS "Cascading Style Sheets, they way to control how a webpage looks."


## innerHTML and Attributes

Current [best practice]() for JavaScript in the browser is to orchestrate behaviors. To do this
we need to beable to get the values on HTML elements as well as their attributes. This is easy
with _YUI3_ (aside: _jQuery_ also makes this easy and you'll spot parrallels here). _YUI3_ is
modular and accessing the _DOM_ is done through loading a module called [node][]. That is
what the first line wrapping our code is about--

```JavaScript
    YUI().use("node", // and so on
```

_YUI3_'s _node_ module wraps the _DOM_ is a useful set of functions to working with it. It allows
us to use the same methods even on very old browsers (e.g. I.E. 6, or Android 2.x' browser). If you don't
need to work with the _DOM_ via _YUI3_ you don't need to load this module (e.g. if you're writting a _YUI3_
based server side application then you usually don't need _node_). If you are familiar with _jQuery_ 
then the _node_ module is where you'll find most of the overlap since _jQuery_ grew out of the need to
normalize _DOM_ interaction. For now just use _node_ the opening line as boilerplate until we
dive deeper into _YUI3_ rich module capabilities.


This is
also true of YUI3's _node_ module. A YUI3 _node_ is analgous to a DOM element. It provides many of the same
access methods but also additional ones.  In this section of the tutorial we're going to explore
a few the common access methods. I will focus on showing how to get or set the _innerHTML_ of a tag as well
as how to get or set the attributes of a tag. Let's review out _selecting-all.html_ example and pick it 
apart.

```JavaScript
    var all_anchors = Y.all("a"), 
        div_results = Y.one("#results");
    
```

This first block gets the selectors we want to work with.  _Y.all()_ will produce a list of anchor elements
found on the page. The _Y.one()_ selects a single div element (i.e. div.results). We now have parts of the
page to work with.

**all_anchors** is a list and YUI3 provides a nice method called _each()_ that makes it trivial to iterate
of the parts of that list.  It is similar though not identical to the JavaScript Array method _forEach()_
or jQuery's list method _each()_. Let us look at the _each()_ method in this example.

```JavaScript
    all_anchors.each(function (anchor) {
        results.push(anchor.get("href"));
    });
```

In this example we get each _href_ from each _anchor_ and add it (i.e. _push()_) to the _results_ array.
If there had been a _title_ attribute we wanted to list we could use _anchor.get("title")_ to retrieve its
value.

Finally we set the contents of the _div.results_ tag with _setHTML()_.  _setHTML()_ allows you to inject
HTML elements via a String into the page.  It doesn't escape the angle brackets in the markup.  If you
want to escape the string you're inserting into the page then use _set("text", value)_ where _value_
is the string you want to escape and insert into the page. This will make more sense if we show it.
Modify _selecting-all.html_'s script block to use _div.results.set("text", ...)_

```JavaScript
            <script>
                YUI().use("node", function (Y) {
                    var all_anchors = Y.all("a"),
                        div_results = Y.one("#results"),
                        results = [];

                        all_anchors.each(function (anchor) {
                            // Grab the href from each anchor element and save it
                            // in the results.
                            results.push(anchor.get("href"));
                        });
                        // Now display the resultsin div.results as plain, escaped text
                        div_results.set("text", "The following links were found <em>" + results.join(", ") + "</em>");
                });
            </script>
```

Now when you display the page you should see _<em>_ and _</em>_ as part of the script.


## Taking action

- mouse clicks, keyboard commands and touch

## Elements

- Creating, replacing and removing tags

## Modules

- Using modules

## Going Remote

- Interacting with remote content via Y.io

## Persistence

- Saving things for latter with StorageLite

## Pushing Data

- http GET, POST, PUT and DELETE

## Making Modules

- make a simple module to parse url parameters

## SPA

- Building a Simple Single Page Application

## Reminders

- Should you use YUI for that?

    * If HTML can do it, usc HTML
    * If CSS can do it, use CSS

## Up Next

- Finding helpful YUI3 Modules, documentation and examples




