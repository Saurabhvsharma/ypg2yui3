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
to confusion. I've found seaching Stackexchange and Google Groups more helpful. Additionally
there is an active IRC community on icefreeenode.net under #yui.


[YUI3]: http://yuilibrary.com "YUI3 was at version 3.10.0 at the time this article was written"


# Contents #
- [Preface](#preface) -- What you'll need before you begin
- [Starting](#getting started) -- The minimum to pull YUI3 into the webpage
- [Selectors](#selectors) -- Getting Access to parts of a webpage
- [DOM](#dom) -- interacting with innerHTML and attributes
- [Action](#action) -- Mouse clicks, keyboard commands and touch
- [Modules](#modules) -- Moving beyond **node**
- [Remote](#remote) -- Bring content into the page with **Y.io**
- [Persistence](#persistence) -- Saving things for latter with Y.StorageLite
- [Templates](#templates) -- Building out a page with **Y.Handlebars**
- [API](#api) -- Using http GET, POST, PUT and DELETE
- [SPA](#spa) -- Building a simple Single Page Application
- [Reminders](#reminders) -- Should you use YUI for that?
- [Next](#next) -- Finding helpful YUI3 Modules, documentation and examples


## Preface

### What you'll need before you begin

The typical web developer setup is a computer, a web browser, a text editor and a web server.
Specific examples include--

* Computers:
    * a Mac, a Windows PC, a Linux Virtual Marchine or even a Raspberry Pi
* Web Browsers:
    * Firefox, Chrome, Safari, IE, or Opera (its good to test on more than one browser)
* Text Editors:
    * Adobe Brackets, Coda, Text Mate, Sublime Editor, ShiftEdit, vi, Emacs
* Web Servers:
    * httpster (a Node based http server nice for development use), NginX, Cherokee and the venerable Apache


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
nice opportunities when you move beyond the browser--

    1) What you learn in the browser can be used server side
    2) _YUI3_'s tool chain is Node based
    3) [Mojito]() is based on on _YUI3_ plus _Node_
    4) Node runs on _Mac_, _Windows_ and many _Unix_ (e.g. Intel and Arm based _Linux_)

I've found the little _Node_ webserver called [httpster](https://github.com/SimbCo/httpster)
to be very convient in front-end development.  It is worth a look too.

Finally I make the assumption you have an active connection to the internet.


### Some links

* [YUI Library](http://yuilibrary.com), the main YUI site
* [YUI at Github](http://github.com/yui/yui3), source code for YUI3
* [Firefox](http://www.mozilla.org)
* [Adobe Brackets](http://brackets.io)
* [NodeJS](http://nodejs.org)
* [httpster](https://github.com/SimbCo/httpster), follow the instructions in the "README.md" to install


## Starting

### The minimum to pull YUI3 into the webpage

This is a short work on using YUI3 library in the _browser_. _YUI_ needs to be
available to the webpage. Fortunately this is easy. You use a _script_ tag to include it
from Yahoo's CDN. Let us build a simple webpage using YUI3 to change the
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
            <p>When YUI3 is loaded the title and h1 will be updated.</p>
```

Now include YUI3 from Yahoo's CDN with the following script element.

[getting-started.html](getting-started.html)
```HTML
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
```

Now we want to change the contents of the _title_ and _h1_ tags.
Here is the code we add to do that in this script block.

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

Save this as the file _getting-started.html_. Point your web browser at the page
and take a look (e.g. http://localhost/getting-started.html assuming
you're running your local web server on port 80 and this document is in the 
root web folder.)

You should now see your first _YUI3_ enabled web page.


### A quick comparison with jQuery

If you have used [jQuery](http://jquery.com) before I think you'll notice a similar pattern.

```HTML
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script>
    $(document).ready(function () {
        $("title").html("Hello World");
        $("h1").html("Hello World");
    });
    </script>
```

The line with document ready includes a wrapping function providing a namespace for your code.
_YUI_ also does this though technically it loads a module called _node_ to provide the features
similar to _jQuery_'s _$_ function. In _YUI_ those functions are used from the parameter passed
in named _Y_.  Part of making the transition from _jQuery_ to _YUI3_ is understanding where
and how they are similar. If you used a _$_ in jQuery look for _Y_ dot something in YUI3.


## Selectors

### Getting access to parts of a webpage

        CSS selectors work the way you expect but save those refernences to be efficient!

_YUI3_ uses [CSS][] selectors to access parts of the webpage you want to interact with.
This typically is by indentifing an element via an _id_ or _class_ attribute. You may also
use CSS psuedo classes and element relationships to target a specific element in the
page (e.g. the _li_ contained in a _ul_ list). There is a cost to caculating where in the _DOM_ you're
going to work on. Like in _jQuery_ the best practice in _YUI3_ is to save the reference if you need it more
than once. Here's an an example _script_ block for improving our first _getting-started.html_ example
where we're saving the DOM selector results.


```JavaScript
            <script>
                YUI().use("node", function (Y) {
                    var title = Y.one("title"),
                        h1 = Y.one("h1");
                    
                    title.setHTML("Hello World - improved.");
                    h1.setHTML("Yippee! I can be more efficient.");
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
        <!-- load YUI3 on the page as normal -->
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <!-- Now write our script to cound the anchor elements and update div.results -->
            <script>
                // Load the node module and create our Y object.
                YUI().use("node", function (Y) {
                    // Enumerate the anchor elements
                    var all_anchors = Y.all("a"),
                        // Remember the place in the page to update the results
                        div_results = Y.one("#results"),
                        results = [];

            // Now we have our anchors, look through them collecting each href
                        all_anchors.each(function (anchor) {
                            // Grab the href from each anchor element and save it
                            // in the results.
                            results.push(anchor.get("href"));
                        });
                        // Display the results in div.results as HTML
                        div_results.setHTML("The following links were found <em>" + results.join(", ") + "</em>");
                });
            </script>
        </body>
    </html>
```

[DOM] http://en.wikipedia.org/wiki/Document_Object_Model "The Object which the browser uses to allow access to parts of a webpage."
[CSS] http://en.wikipedia.org/wiki/CSS "Cascading Style Sheets, they way to control how a webpage looks."


## DOM

### interacting with innerHTML and attributes

JavaScript in the browser is useful for orchestrating behaviors. To do this
we need to beable to get the values inside HTML elements as well as their attributes. This is easy
with _YUI3_. The _node_ module provides us with a rich set of methods for interacting with the
_DOM_ but you only need a few to get useful work done. This is done in two steps

1) Get the node you want to work with via Y.one() or Y.all()
2) use Y.get(), Y.set(), and Y.setHTML() to interact with that element. 

```JavaScript
    YUI().use("node", function (Y) {
     // Step 1, get a handle to the node you want to work with in this case an anchor tag
     var anchor = Y.one("a"),
             // Now get the value of the href attribute.
         href = anchor.get("href"),
             // Get the innerHTML of the anchor
             innerHTML = anchor.get("innerHTML");

             // Too see the results in the JavaScript console of the browser use Y.log()
         Y.log("The href is " + href);
             Y.log("The innerHTML is " + innerHTML);
    });
```

_YUI3_'s _node_ module wraps the _DOM_ in a rich set of useful functions. It allows
us to use the same methods even on very old browsers (e.g. I.E. 6, or Android 2.x' browser).
There are a whole list of additional methods you may find convienent. A good place to 
begin your exploration is at [yuilibrary.com/yui/docs/node](http://yuilibrary.com/yui/docs/node).
There are methods that make quick work of interacting with CSS classes and styles as well as
locations (i.e. x,y coordinates) on the page. Just remember best practice to use CSS to 
control the view and layout and only resort to JavaScript if there isn't a CSS alternative.


Now that you've seen a little of _YUI_ we're going to put what we've shown to use and
expand on it through a series of exercises. In each exercise you'll be asked to use
both what you know and also to lookup and find something on the [yuilibrary.com] side
that will help you expand beyond the specifics discussed previously.

Here is a seed file you can use to start your exercises from.

[seed-file.html](seed-file.html)
```JavaScript
    <!DOCTYPE html>
    <html>
        <head>
            <title>Seed File, put your title here.</title>
        </head>
        <body>
            <header>Header info goes here</header>
            <section>Main content goes here</section>
            <footer>Footer things go here</footer>
            <!-- get YUI3 on the page, and a script block for your code -->
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <script>
            YUI().use("node", function (Y) {
                // Your code goes here
            });
            </script>
        </body>
    </html>
```

### Exercise Digital Clock

    - Programming goal: build a simple digital clock in the webpage
    - Learning objective: Explore the _node_ module of _YUI_ and use a few additional methods besides _Y.get()_, _Y.set()_ and _Y.setHTML()_.

Using YUI3 update content in the webpage every five seconds displaying the current time.

#### Steps

Copy _seed-file.html_ to _digital-clock.html_. Do the following things

1) Add an _id_ attribute of "clock" to _section_.
2) Add a _style_ element in the _head_ of the document setting font size of section to "2em"
3) In your _style_ element create two CSS classes
    - .now-blue { color: blue; background-color: white }
    - .now-red { color: red; background-color: red }
4) Go to [yuilibrary.com](http://yuilibrary.com/yui/docs/node) and find three methods for checking if a class is present, adding a class and removing a class.
5) Inside your _Y_ function use a JavaScript _setInterval()_ to update the innerHTML with the current time every five seconds.
6) Each time your update the time swap the classes between _now-blue_ and _now-red_.
7) Load the webpage and watch to see if the section innerHTML changes every five seconds and also if the colors change too.

#### Exercise Notes

* In this tutorial I've opted for in-line code much of the time, this isn't best practice, it is just convienent here
* One approach to the solution - [digitial-clock.html](digital-clock.html), review it and compare with your own code.


### Exercise Which Page Am I on?

    - Programming goal: compare the page name in _window.location.href_ with the _href_ in a _ul_ list of anchors elements, if there is a match set a _here_ class on the _li_ element and replace the anchor element with the innerHTML of the anchor. 
    - Learning objectives: Query a list of elements and look at each one, update the attributes in an element as well as its innerHTML

Copy _seed-file.html_ to _where-am-i.html_.  Do the following things

1) Add a _nav_ element before section
2) In the _nav_ element create a list of seven URLs, one should be for the webpage _where-am-i.html_
3) in the _style_ element of _head_ add a CSS class named "here", that swaps the foreground and background colors
4) Look up examples for using _Y.all()_ and _Y.each() at [yuilibrary.com](http://yuilibrary.com/yui/docs/node)
4) In your _Y_ function use CSS query solition to get a list of ALL _li_ elements with _anchors_
5) For each _li_ get the containing anchor, check if the _href_ points at the same _href_ as in _window.location.href, update the _li_ if it matches

#### Excercise Notes

* Again we're using in-line code for simplicity in instruction, this is not recommended practice for constructing navigation
* One approach to the solution - [where-am-i.html](where-am-i.html)

## Action

### Mouse clicks, keyboard commands and touch

## Modules

### Moving beyond **node**

## Remote

### Bring content into the page with **Y.io**

## Persistence

### Saving things for latter with Y.StorageLite

## Templates

### Building out a page with **Y.Handlebars**

## API

### Using http GET, POST, PUT and DELETE

## SPA

### Building a simple Single Page Application


## Reminders

### Should you use YUI for that?

    * If HTML can do it, usc HTML
    * If CSS can do it, use CSS

## Next

### Finding helpful YUI3 Modules, documentation and examples

