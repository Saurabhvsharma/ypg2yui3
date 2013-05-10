ypg2yui3
========

# Young Person's Guide to YUI3

by R. S. Doiel, <rsdoiel@gmail.com>
Updated: 2013-05-09


This is a gentle introduction to [YUI3][]. It does make a few assumptions-

* You have a basic knowledge of JavaScript, HTML, CSS
* A basic idea of how the web works

For those who might be familiar with jQuery I'll point out the similarities
to speed you along.

For a much more complete look at YUI3 I recommend [Evan Goer](http://www.goer.org/)'s
[YUI3 Cookbook](http://shop.oreilly.com/product/0636920013303.do). It has been the goto
text for bootstrapping my understanding of YUI3. It is also a handy set of recipes
for YUI3's practical application.  Additionally the [YUILibrary](http://yuilibrary.com)
website has the canonical documentation and you can read the source for YUI3 at
[Github](https://github.com/yui/yui3) under yui/yui3.

A note about using Google Search for learning YUI3. Right now, May 2013, the Google's search
algorhythm still ranks legacy YUI2 documentation higher than YUI3.  This can easily lead
to confusion. I've found seaching Stackexchange and Google Groups more helpful. Additionally
there is an active IRC community on irc.freeenode.net under #yui.


[YUI3]: http://yuilibrary.com "YUI3 was at version 3.10.0 at the time this article was written"


# Contents #
- [Preface](#preface) -- What you'll need before you begin
- [Starting](#starting) -- The minimum to pull YUI3 into the webpage
- [Selectors](#selectors) -- Getting Access to parts of a webpage
- [DOM](#dom) -- interacting with innerHTML and attributes
- [Action](#action) -- Mouse clicks, keyboard commands and touch
- [Modules](#modules) -- Moving beyond **node**
- [Templates](#templates) -- Building out a page with **Y.Handlebars**
- [Persistence](#persistence) -- Saving things for latter with **Y.StorageLite**
- [Remote](#remote) -- Bring content into the page with **Y.io**
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
    * httpster (a [Node][] based http server nice for development use), NginX, Cherokee and the venerable Apache and IIS


### A word about text editors

Most developers have opinions about text editors. Sometimes very strong opinions. I don't.
They are just a computer program and I tend to use the ones available to me. That isn't to
say there aren't some helpful things to look for.  One feature I really like is syntax highlighting.
It makes it much easier to read code quickly. Another is an integrated linting tool (e.g.
[jslint](http://jslint.com) or [jshint](http://jshint.com)). I find both of these features to
be helpful in spotting the sillier things I type.

If you don't have an editor you like may I suggest [Adobe Brackets][1] or [Scripted Editor][2]. They
are both built from the same building blocks we use on the web -- HTML, CSS, JavaScript. That
makes it easy to extend and improve to meet your own needs. They also come out of the box
with syntax highlighting and jslint/jshint.

[1]: http://brackets.io "Adobe Brackets is a text editor written in JavaScript, CSS and HTML. It is free and open source."
[2]: https://github.com/scripted-editor/scripted "Like Brackets is is build from JavaScript, CSS and HTML and is also open source."
[node]: http://nodejs.org "A JavaScript environment for building network, file system and other services"

### A word about Node

While this tutorial is focused on the web browser _YUI3_ also supports [NodeJS](http://nodejs.org) 
(a.k.a. Node) as a first class platform. This presents several nice opportunities when you 
move beyond the browser--

1. What you learn in the browser can be used server side
2. The _YUI3_ tool chain is Node based
3. [Mojito](http://developer.yahoo.com/cocktails/mojito/) is based on on _YUI3_ plus _Node_
4. Node runs on _Mac_, _Windows_ and many _Unix_ (e.g. Intel and Arm based _Linux_)

I have found the little _Node_ webserver called [httpster](https://github.com/SimbCo/httpster)
to be very help for front-end development. It allows to easily serve content from your current working folder
as easily as typing _httpster_. 

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

_YUI_ needs to be available to the webpage to be useful. Fortunately this is [easy][]. 
You use a _script_ tag to include it from Yahoo's CDN. Let us build a simple webpage 
using YUI3 to change the pages' _title_ to "Hello World" and the first _h1_ to "Yippee! It worked.".

[easy]: http://yuilibrary.com/yui/quick-start/ "YUI Quick Start at yuilibrary.com"

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

Now we want to change the contents of the _title_ and _h1_ tags to show that this worked.
We add another script block for that.

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
similar to _jQuery_'s _$_ object. In _YUI_ those functions are used from the parameter passed
in named _Y_.  Part of making the transition from _jQuery_ to _YUI3_ is understanding where
and how they are similar. If you used a _$_ in jQuery look for _Y_ dot something in YUI3, if
you used a _$( ... )_ then look at using either a _Y.one()_ or _Y.all()_ depending on whether
you need a single element or a list of elements.


## Selectors

### Getting access to parts of a webpage

        CSS selectors work the way you expect but save those references to be efficient!

_YUI3_ uses [CSS][3] selectors to access parts of the webpage. This typically is by indentifing 
an element via an _id_ or _class_ attribute. You may also use CSS psuedo classes and element 
relationships to target a specific element in the page (e.g. the _li_ contained in a _ul_ list). 
There is a cost to caculating where in the _DOM_ you're going to work on. Like in _jQuery_ the
best practice in _YUI3_ is to save the reference if you need it more than once. Here's an example 
_script_ block for improving our first _getting-started.html_ example where we're saving the 
DOM selector results.


```HTML
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
first element in the [DOM][4] matching that selector. In our example above that was _title_ and _h1_.  If
you had more than one _h1_ it would only give the first _h1_ it found. Usually this is what you want.
Sometimes you want all the elements that match`a selector (e.g. all the anchor tags in a page). 
To get that you use _Y.all()_.  That returns a list of elements. It is easiest to explain
by showing.  Let us create a short element with a list of links to YUI3 resources. Next
we'll update part of the page to indicate the links we found.

[selecting-all.html](selecting-all.html)
```HTML
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

[3]: http://en.wikipedia.org/wiki/CSS "Cascading Style Sheets, they way to control how a webpage looks."
[4]: http://en.wikipedia.org/wiki/Document_Object_Model "The Object which the browser uses to allow access to parts of a webpage."


## DOM

### interacting with innerHTML and attributes

JavaScript in the browser is useful for orchestrating behaviors. To do this
we need to beable to get the values inside HTML elements as well as their attributes. This is easy
with _YUI3_. The [node] module provides us with a rich set of methods for interacting with the
_DOM_ but you only need a few to get useful work done. This is done in two steps

1. Get the node you want to work with via _Y.one()_ or _Y.all()_
2. use _Y.get()_, _Y.set()_, and _Y.setHTML()_ to interact with that element. 


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

[node]: http://yuilibrary.com/yui/docs/node/ "The YUI3 Node module provides access to DOM elements."

_YUI3_'s _node_ module wraps the _DOM_ in a rich set of useful functions. It allows
us to use the same methods even on very old browsers (e.g. I.E. 6, Android 2.x browser).
There are a whole list of additional methods you may find convienent. A good place to 
begin your exploration is at [yuilibrary.com/yui/docs/node](http://yuilibrary.com/yui/docs/node).
There are methods that make quick work of interacting with CSS classes and styles as well as
locations (i.e. x,y coordinates) on the page. Remember best practice is to use CSS to 
control the view and layout and only resort to JavaScript if there isn't a CSS alternative.


Now that you've seen a little of _YUI_ we're going to put what we've shown to use and
expand on it through a series of exercises. In each exercise you'll be asked to use
both what you know and also to lookup and find something on [yuilibrary.com](http://yuilibrary.com) 
that will help you expand beyond the specifics discussed previously.

Here is a seed file you can use to start your exercises from.

[seed-file.html](seed-file.html)
```HTML
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


### Exercises

#### Digital Clock

- Programming goal
    + build a simple digital clock webpage
- Learning objective 
    + Explore the _node_ module of _YUI3_
    + Use additional methods besides _Y.get()_, _Y.set()_ and _Y.setHTML()_.


Using YUI3 update content in the webpage every five seconds displaying the current time manipulate
the CSS classes attach to the element showing the time.


##### Steps

Copy _seed-file.html_ to _digital-clock.html_. Do the following things

- Add an _id_ attribute of "clock" to _section_.
- Add a _style_ element in the _head_ of the document setting font size of section to "2em"
- In your _style_ element create two CSS classes
    + .now-blue { color: white; background-color: blue }
    + .now-red { color: white; background-color: red }
- Go to [yuilibrary.com](http://yuilibrary.com/yui/docs/node) and find three methods for checking if a class is present, adding a class and removing a class.
- Inside your _Y_ function use a JavaScript _setInterval()_ to update the innerHTML with the current time every five seconds.
- Each time your update the time swap the classes between _now-blue_ and _now-red_.
- Load the webpage and watch to see if the section innerHTML changes every five seconds and also if the colors change too.


##### Notes

* In this tutorial I have opted for [in-line][5] code for convienence
* One approach to the solution is [digital-clock.html](digital-clock.html). Review it and compare with your own code.


#### Where Am I?

- Programming goal
    + compare the page name of _where-am-i.html_ with the _href_ in a _ul_ list of anchors elements
    + if there is a match set replace the anchor element with a span containing a _here_ class.
- Learning objectives
    + Work with a list of elements
    + Look into each one
    + Replace elements as well as its innerHTML


##### Steps

Copy _seed-file.html_ to _where-am-i.html_.  Do the following things

- Add a _nav_ element before section
- In the _nav_ element create a list of seven URLs, one should be for the webpage _where-am-i.html_
- in the _style_ element of _head_ add a CSS class named "here", that swaps the foreground and background colors
- Look up examples for using _Y.all()_ and _Y.each()_ at [yuilibrary.com](http://yuilibrary.com/yui/docs/node)
- In your _Y_ function use CSS query solition to get a list of ALL _li_ elements with _anchors_
- For each _li_ get the containing anchor, check if the _href_ points at _where-am-i.html_
    - update the _li_ if it matches

##### Notes

* We are using in-line code for simplicity of instruction
* One approach to the solution is [where-am-i.html](where-am-i.html)


[5]: https://en.wikipedia.org/wiki/Inline_expansion "In-line is not a 'best practice' particularlly in more complicated websites and applications."


## Action

_YUI3_ provides a robust event system which includes listening for mouse, key and touch events. Unlike other
JavaScript frameworks _YUI3_ approaches the development problem wholistically and doesn't create a 
separate library for touch devices (e.g. phones and tablets). Instead your code can work across all devices.
_YUI3_ loader also makes it efficient and how much code you download to the device. To add support
for touch guesters, mouse interaction and the like I am introducing another module called [event][].  It will
let us _listen_ for interesting things on the _DOM_.

[event]: http://yuilibrary.com/yui/docs/event/ "The Event modules provide access clicks, touch, touch guestures and keypress"


### Mouse clicks, keyboard commands and touch

Interaction with the elements in the page by a mouse, keyboard or touch triggers an event. If you are listening
for an event then you can get an event object. This is like the normal DOM events exposed in JavaScript or
in libraries like _jQuery_. You can choose to handle the event, alter the propogation and stop listening to it.
The key is to get a handle to the object and then use the _on()_ method to setup a callback to use when the event
happens.

### Exercise

#### What happened?

- Programming goal
    - Display a button and monitor for click and flick events
- Learning objectives
    - Learn how to include the event module
    - Learn how to a listeners on elements

This is another example of showing making more sense than telling but let me quickly outline the
steps you normally take to get started.

1. Load _YUI3_ in the page
2. In your Script blog (or JavaScript file using _YUI3_) include the _event_ module.
3. In your _Y_ function select the object you want to listen to (e.g. a button) then use _on()_ to add behavior.

That is the basic approach. In this example let us create a simple webpage with a button in the middle and
a status line in the footer.  When we pick up an event listened for then update the status line (e.g. mouse
key pressed if a your clicks on the button). This is example let's listen for clicks and flick guesture.

##### Steps

Copy _seed-file.html_ to _what-happened.html_. Do the following things

1. Add a _button_ element to the _section_ element in our HTML markup
2. Update the line where we _use()_ _YUI_ and generate our _Y_ function to to include the _event_ module.
3. Select our button using _Y.one()_
4. Add listeners via _on()_ method for click and flick

#### Notes

* It is important to remember that event listeners do have an overhead, if you don't need it anymore then remove the listener.
* One approach to the solution is [what-happened.html](what-happened.html)



## Modules

### Moving beyond **node** and **event**

The concept of modules is important in _YUI_. I would go so far as to say it defines
the nature of _YUI_.  _YUI_ strength and longevity has been its flexibility in loading
modules either via _script_ elements, dynamic loading or rollups. What people are using
_RequireJS_, _AMD_ for today _YUI_ has had for years. Unlike many other browser module
loaders _YUI_'s approach works both in the browser and server side in _Node_. 


Why modules? It allows for effective code re-use.  It allows you to tailor what code is
delivered to the browser and when it should be delivered to the browser.  If you have
confunctionality that is only need at certain times (e.g. when someone is logged in or
is using an old version of a browser) modules help you do that. Modules also support
versioning and allow for multiple instancies with different versions.  You can even
include other libraries (e.g. jQuery) via _YUI_'s module and loader system.


What is a module? A block of JavaScript wrapped in _YUI().add()_. That is all it is. It
can be more than that (e.g. you can add version info, dependency information) but at its
simplest form it is what you attach to _Y_ via _add()_.

```JavaScript
    // Here we define a module called Hello World
    YUI.add("hello-world", function (Y) {
        Y.namespace("hello-world");
        Y.helloWorld = "Hello World!"; 
    });
    
    // Here we use a module called Hello World
    YUI().use("hello-world", function (Y) {
        // We can display Hello World message in the p element
        Y.one("p").set("text", Y.helloWorld);
    });
```

We can also put our module in a separate file (e.g. _hello-world.js_).

[hello-world.js](hello-world.js)
```JavaScript
    // Here we define a module called Hello World
    YUI.add("hello-world", function (Y) {
        Y.namespace("hello-world");
        Y.helloWorld = "Hello World!"; 
    });
    
    
```

We can re-use that module by including it in a _script_ element before our _use()_ script element.

[hello-world.html](hello-world.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head><title>Hello World</title></head>
        <body>
            <p>Our message goes here</p>
            <!-- Include YUI -->
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <!-- Include our module -->
            <script src="hello-world.js"></script>
            <!-- Now use our module -->
            <script>
            // Now we're ready to 'use' our Hello World and the YUI node module.
            YUI().use("node", "hello-world", function (Y) {
                // We can display Hello World message in the p element
                Y.one("p").set("text", Y.helloWorld);
            });
            </script>
        </body>
    </html>
```

If we don't want to use an extra _script_ element then we can tell _YUI_ where to find our
module with a little bit of [configuration][].


[hello-world-2.html](hello-world-2.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head><title>Hello World</title></head>
        <body>
            <p>Our message goes here</p>
            <!-- Include YUI -->
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <!-- Include our module via configuration -->
            <script>
            // Tell YUI where to find our module, then "use" it.
            YUI({
                modules: {
                    "hello-world": {
                        fullpath: "hello-world.js"
                    }
                }
            }).use("node", "hello-world", function (Y) {
                // We can display Hello World message in the p element
                Y.one("p").set("text", Y.helloWorld);
            });
            </script>
        </body>
    </html>
```



[configuration]: http://yuilibrary.com/yui/docs/yui/#loading-modules "YUI is extremely flexible in how you load modules."
[namespaced]: http://yuilibrary.com/yui/docs/api/classes/YUI.html#method_namespace "Namespaces let us use versions and other modules without name collisions"

Take away points

* Modules helps in code re-use
* Modules can be references locally via a _script_ element
* Modules can be dynamically (and asynchronously loaded)
* Modules can be local to your web server and that location can be defined through configuration
* Modules can be also submitted to _YUI_'s gallery and be hosted in Yahoo's CDN

Like events, working with modues is easier shown.

#### A quick aside on YUI Gallery

_YUI_ supports a whole [gallery] of user contributed modules. Some specialized and more general
purpose. The good thing is that only load them if you need them and infact if you want to load
only a specific version you can do that too. Before something becomes part of _YUI3 core_ it
is first additioned as a gallery module.  Some features that are in _core_ but will migrate
out to the _gallery_ if it is determined they are not frequently needed. Being in the gallery
is not a statement on the quality or importance of the code. Being in the gallery means your
code could be included on Yahoo's CDN which simplifies using it for others. 

[gallery]: http://yuilibrary.com/gallery/ "Gallery modules are linked from yuilibrary, many are available on Yahoo's CDN, but the source is often on github.com"

### Excercise

#### What Time is it?

- Programming Goal
    + Create a simple _YUI_ module out of our digital clock
- Learning Objectives
    + Increase understanding on how to load modules
    + Illustrate the a simple case of creating a module
    + Explore loading a module based on configuration

Let us turn our "digital clock" into a module. The idea is to create 
an Object attached to your _Y_ called _DigitalClock_ you could then add
that to a _DOM_ element.  An optional callback function to supported
extending the module with a custom render function (e.g. an analog clock
using Canvas).

##### Steps

Create a new file called _digital-clock.js_. We will put our module code there.
Copy _seed-file.html_ to _digital-clock-2.html_. Do the following things

1. In _digital-clock-2.html's _script_ in-line element add configuration to point our our module.
2. In _digital-clock-2.html's _script_ in-line element update the _use()_ function to include our module.
3. Open our empty digital-clock.js file and create our module
    a. create a namespace
    b. create a _render()_ method that returns HTML markup as a string of our clock's current time
        - this should expect a _Date_ object as a parameter to be rendered.
    c. create a _run()_ method that uses setInterval to update our clock every second. 
        - first paramter is a CSS selector of an element which will hold our clock
        - An optional second parameter should allow for a custom render method
        - If a render method is not provided use our default _render()_ we implemented.
4. Go back to our _digital-clock-2.html_ file.
5. Inside the _Y_ on our in-line _script_ element use _Y.DigitalClock.render()_ to run our clock.

#### Notes

* We are using a external file for some of our JavaScript this time (i.e. our module)
* One possible solition is [digital-clock-2.html](digital-clock-2.html) and [digital-clock.js](digital-clock.js) holding our module code.


## Templates

### Building out a page with **Y.Handlebars**

Templates are a convient solution to generating HTML from JavaScript functions. Templates on JavaScript
can often be rendered server side as well as in the browser. This is true of _Handlbars_ templates.  _Handlebars_
is an extention to a popular template notation called _Mustache_.  The basic idea is your surround the 
parts of the markup you want to replace with double curly brackets surrounding a variable name.  When
you provide the template generate function with an object that contains attributes that matches those
curly bracket variable names then the template engine replaces the content.  Here's a quick
example of a template--


```HTML
    <div><span id="name">{{name}}</span> <span id="phonenumber">{{phonenumber}}</span></div>
```

Here's an example of a JSON object that could be used to populate the template--

```JavaScript
    {"name": "John Doe", "phonenumber": "+1-222-333-4444"}
```

If you applied that object to that template you'd get something like

```HTML
    <div><span id="name">John Doe</span> <span id="phonenumber">+1-222-333-4444</span></div>    
```

In the past it was common to see code that look like this to generate the same HTML fragment from
JavaScript--

```JavaScript
    record = {"name": "John Doe", "phonenumber": "+1-222-333-4444"},
    html = '<div><span id="name">' + record.name + '</span> <span id="phonenumber">' +
        record.phonenumber + '</span></div>;    
```

It is not too bad but when you get lots of fields (e.g. a person's profile, an event listing) you
get lots of concatenation operations. That isn't terribly effecient for JavaScript and if you miss a
closing quotation can be tough to debug.

#### Embedding your handlebars template

The easiest place to embed your template is in the HTML file itself.  A practice of using _script_ elements
has been evolving as a way of designating the template but getting the templates with the page. Building
on our previous example here is a simple webpage that displays our that displays a list of names and
phone numbers embedded in a _ul_ element.  We load _YUI_ normally but include _handlebars_ as a module.
We fetch the templates using _Y.one()_ by id. We compile them and then apply them to our target
element.  While our example as one template in principle you can do this as many times as you need
for the page's content.  With slight modification in approach you could pre-render this server side
for a truely pregressively enhanced experience.

[handlebars-demo-1.html](handlebars-demo-1.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Handlebars Demo 1</title>
        </head>
        <body>
            <header>Handlebars Demo 1</header>
            <section>Main content goes here</section>
            <footer></footer>
            <!-- Define a template to render our UL list with -->
            <script id="list-template" type="text/x-handlebars-template">
            {{#if data}}
                <ul>
                {{#data}}
                    <li><span class="name">{{name}}</span> <span class="phonenumber">{{phonenumber}}</span></li>
                {{/data}}
                </ul>
            {{#else}}
                <p>No data to display</p>
            {{/if}}
            </script>
            <!-- Define some data to put in the template -->
            <script type="text/javascript" rel="javascript">
                var data = [
                    {name: "Jane Doe", phonenumber: "+1-222-333-5555"},
                    {name: "John Doe", phonenumber: "+1-222-333-4444"},
                    {name: "Tina Doe", phonenumber: "+1-222-333-6666"}
                ];
            </script>
            <!-- get YUI3 on the page, and a script block for your code -->
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <script>
            YUI().use("node", "handlebars", function (Y) {
                // Your code goes here
                var template_source = Y.one("#list-template").getHTML(),
                    template = Y.Handlebars.compile(template_source),
                    section = Y.one("section");
                
                section.setHTML(template(data));
            });
            </script>
        </body>
    </html>
```

Of course you could also define your templates outside the document and bring them in via an [xdr][] call.


[xdr]: http://docs.webplatform.org/wiki/apis/xhr "xdr - Cross Domain Request, also referred to as Ajax."

### Exercise

#### Digital Clock with Template

- Programming Goal
    + Re-factor our Digital Clock _YUI_ module to use templates rather than a custom render method.
- Learning Objective
    + Become with familiar with the basics of _Handlebars_ as implemented in _YUI_

##### Steps

##### Notes

* One implementation is [digital-clock-3.html](digital-clock-3.html)


## Persistence

### Saving things for latter with Y.StorageLite


## Remote

    Some times you want data from someplace else, say Dave Winer's blog Scripting News...

### Bring content into the page with **Y.io**

Sometimes we need data from other websites or even an API in our hosting website. It is nice to have that option
in the browser and _YUI_ has a module for that :-).  The module is called _IO_ or more specifically in your _Y_ function
_Y.io_. It abstracts content input and output. That means it can be used to load other content (e.g. RSS, XML, HTML, JSON)
as well as used to push data to a server (e.g. a forms' POST, PUT, GET or DELETE).  The module takes a URL as a source
then supplies an event where you can hook into a number of conditions (e.g. success, failure, complete).

[rss-as-json.html](rss-as-json.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Scripting News RSS</title>
        </head>
        <body>
            <header>Scripting News RSS</header>
            <section>RSS will go here when we have them.</section>
            <footer>See [Scripting News](http://scripting.com) for the source of the feed. Dave Winer has a great explanation
            of RSS as [JSON](http://rssjs.org/) at rssjs.org.</footer>
            <!-- get YUI3 on the page, and a script block for your code -->
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <script>
            // We need to include the IO module in our use method call.
            YUI().use("node", "io", function (Y) {
                // Your code goes here
                var url = "http://scripting.com/rss.json",
                    section = Y.one("section");
                // The first parameter is the URL we're contacting then
                // we give it an object literal for our listener methods
                // and any other methods...
                Y.io(url, {
                    on: {
                        success: function (id, response, args) {
                            var rss = JSON.parse(response.responseText),
                                output = [];

                            if (rss) {
                                if (rss.channel.item.length > 0) {
                                    rss.channel.item.forEach(function (item) {
                                        output.push('<h3>' + item.title + '</h3>' +
                                            '<a href="' + item.link + '">' + item.pubDate + '</a>');
                                    });
                                    section.setHTML(output.join("<p>"));
                                } else {
                                    section.set("text", "No articles found.");
                                }
                            } else {
                                section.set("text", "Could not parse RSS response");
                            }
                        },
                        failure: function () {
                            section.set("text", "Cound not get RSS from " + url)
                        }
                    }
                });
            });
            </script>
        </body>
    </html>
```

On the _YUI_ modules I really like is _Y.io_. It works both in the browser and in _Node_.  That gives a common way to setup remote
API access that might be processed in a middle layer or directly in the client browser. These days I'm usually fetching
JSON content and Dave Winer's Scripting News blog is gracious enough to provide a version in excellent JSON version of his
RSS feed). The URL for the is http://scripting.com/rss.json.  We'll use that as a reference source as we explore
the _Y.io_ module.


## API

### Using http GET, POST, PUT and DELETE

## SPA

### Building a simple Single Page Application


## Reminders

### Should you use YUI for that?

While _YUI3_ is a very good library it is easy to get carried away. Here's some heuristic
in deciding when to use _YUI3_ (or really any JavaScript at all)

- If it is structure then use HTML
- If it is layout or visual look and feel use CSS
- If it is behavior use JavaScript if you can achieve it in HTML and CSS
- If you can do it in simply in JavaScript then do so, if it is more complicated consider _YUI3_

