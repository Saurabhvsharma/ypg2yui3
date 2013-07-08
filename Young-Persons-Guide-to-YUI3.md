
# Young Person's Guide to YUI3 (draft 0)

by R. S. Doiel, <rsdoiel@gmail.com>
Updated: 2013-06-26


This is a gentle introduction to [YUI3][]. It does make a few assumptions-

* You have a basic knowledge of JavaScript, HTML, CSS
* A basic idea of how the web works
* For those who might be familiar with jQuery I'll point out the similarities
to speed you along.

For a much more complete look at _YUI3_ I recommend [Evan Goer](http://www.goer.org/)'s
[YUI3 Cookbook](http://shop.oreilly.com/product/0636920013303.do). It has been
the goto text for bootstrapping my understanding of _YUI3_. It is also a handy
set of recipes for _YUI3_'s practical application.  Additionally the
[YUILibrary](http://yuilibrary.com) website has the canonical documentation and
you can read the source for _YUI3_ at [Github](https://github.com/yui/yui3)
under _yui/yui3_.

A note about using Google Search for learning _YUI3_. Right now, June 2013, the
Google's search algorhythm still ranks legacy _YUI2_ documentation higher than
_YUI3_. This can easily lead to confusion.  I recommend several alternatives

1. [DuckDuckGo](http://duckduckgo.com), use yui3 as one of your search terms
2. [Stackexchange](http://stackoverflow.com/questions/tagged/yui3)
3. IRC community on irc.freeenode.net under #yui.
4. [Google Groups](https://groups.google.com/forum/#!forum/yui-contrib)


[YUI3]: http://yuilibrary.com "YUI3 was at version 3.10.0 at the time this article was written"


# Contents

- [Preface](#preface) -- What you'll need before you begin
- [Starting](#starting) -- The minimum to pull YUI3 into the webpage
- [Selectors](#selectors) -- Getting Access to parts of a webpage
- [DOM](#dom) -- interacting with innerHTML and attributes
- [Action](#action) -- Mouse clicks, keyboard commands and touch
- [Modules](#modules) -- Moving beyond YUI's **node**
- [Templates](#templates) -- Building out a page with **Y.Handlebars**
- [Persistence](#persistence) -- Saving things for latter with **Y.StorageLite**
- [Remote](#remote) -- Bring content into the page with **Y.io**
- [Reminders](#reminders) -- Should you use YUI for that?


## Preface

### What you'll need before you begin

The typical web developer setup is a computer, a web browser, a text editor and a web server.
Specific examples include--

* Computers:
    * a Mac, a Windows PC, a Linux Virtual Marchine or even a Raspberry Pi
* Web Browsers:
    * Firefox, Chrome, Safari, IE, or Opera (best practice is test on multiple browsers)
* Text Editors:
    * Adobe Brackets, Chrome's Text-App, Coda, Text Mate, Sublime Editor, vi, nano, emacs
* Web Servers:
    * httpster (a [Node][] based http server nice for development use), NGinX, Cherokee and the venerable Apache and IIS


### A word about text editors

Most developers have opinions about text editors. Sometimes very strong opinions. I don't.
They are just a computer program and I tend to use the ones available to me. That isn't to
say there aren't some helpful things to look for.  One feature I really like is syntax highlighting.
It makes it much easier to read code quickly. Another is an integrated linting tool (e.g.
[jslint](http://jslint.com) or [jshint](http://jshint.com)). I find both of these features to
be helpful in spotting the sillier things I type.

If you don't have an editor you like may I suggest [Adobe Brackets][1] or [Chrome's Text-app][2]. They
are both built from the same building blocks we use on the web -- HTML, CSS, JavaScript. That
makes it easy to extend and improve to meet your own needs. They also come out of the box
with syntax highlighting.

[1]: http://brackets.io "Adobe Brackets is a text editor written in JavaScript, CSS and HTML. It is free and open source."
[2]: https://github.com/GoogleChrome/text-app "A text editor without jslint also built from JavaScript, CSS and HTML.  Runs as a Chrome web app."
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
to be very help for front-end development. It makes serving content from your current working folder
as easily as typing _httpster_.

Finally I make the assumption you have an active connection to the internet.


### Some useful links

* [YUI Library](http://yuilibrary.com), the main YUI site
* [YUI User Guides](http://yuilibrary.com/yui/docs/guides/)
* [YUI at Github](http://github.com/yui/yui3), source code for YUI3
* [Firefox](http://www.mozilla.org)
* [Adobe Brackets](http://brackets.io)
* [NodeJS](http://nodejs.org)
* [httpster](https://github.com/SimbCo/httpster), follow the instructions in the "README.md" to install


## Starting

### The minimum to pull _YUI3_ into the webpage

_YUI_ needs to be available to the webpage to be useful. Fortunately this is
[easy][]. You use a _script_ element to include it from Yahoo's CDN. Let us
build a simple webpage  using _YUI3_ to change the pages' _title_ to
"Hello World" and the first _h1_ to "Yippee! It worked.".

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

Now include _YUI3_ from Yahoo's CDN with the following script element.

[getting-started.html](getting-started.html)
```HTML
   			<script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
```

Now we want to change the contents of the _title_ and _h1_ element to show that
this worked. We add another _script_ element for that.

[gitting-started.html](getting-started.html)
```HTML
            <script>
                YUI().use("node-base", function (Y) {
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
and take a look.

You should now see your first _YUI3_ enabled web page.


### A quick comparison with jQuery

If you have used [jQuery](http://jquery.com) before I think you'll notice a
similar pattern.

```HTML
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script>
    $(document).ready(function () {
        $("title").html("Hello World");
        $("h1").html("Hello World");
    });
    </script>
```

The line with document ready includes a wrapping function providing a namespace
for your code. _YUI_ also does this though technically my example loads a module
called _node_ to provide the features similar to _jQuery_'s _$_ object. In
_YUI_ those functions are used from the parameter passed in named _Y_.  Part of
making the transition from _jQuery_ to _YUI3_ is understanding where and how
they are similar. If you used a _$_ in jQuery look for _Y_ dot something in
YUI3, if you used a _$( ... )_ then look at using either a _Y.one()_ or
_Y.all()_ depending on whether you need a single element or a list of elements.


## Selectors

### Getting access to parts of a webpage

        CSS selectors work the way you expect but save those references to be efficient!

_YUI3_ uses [CSS][3] selectors to access parts of the webpage. This typically
is by indentifing an element via an _id_ or _class_ attribute. You may also use
CSS psuedo classes and element relationships to target a specific element
in the page (e.g. the second _li_ contained in a _ul_ list). There is a cost to
caculating where in the _DOM_ your element is so like _jQuery_ the best practice
in _YUI3_ is to save the reference if you need it more than once. This can be
done by assigning the reference to a variable. Here's an example _script_
element showing the assignment and use of the saved elements.


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

_YUI3_ provides two function that take a selector.  The first is _Y.one()_. It
will give you the first element in the [DOM][4] matching that selector. In our
example above that was _title_ and _h1_.  If you had more than one _h1_ it
would only give the first _h1_ it found. Usually this is what you want. 
Sometimes you want all the elements that match a selector (e.g. all the anchor
elements in a page).  To get that you use _Y.all()_.  That returns a list of
elements. It is easiest to explain by showing.  Let us create a short element
with a list of links to YUI3 resources. Next we'll update part of the page to
indicate the links we found.

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
we need to beable to get the values inside HTML elements as well as their
attributes. This is easy with _YUI3_. The [node] module provides us with a
rich set of methods for interacting with the _DOM_ but you only need a few to
get useful work done. This is done in two steps

1. Get the node you want to work with via _Y.one()_ or _Y.all()_
2. use _Y.get()_, _Y.set()_, and _Y.setHTML()_ to interact with that element. 


```JavaScript
    YUI().use("node", function (Y) {
        // Step 1, get a handle to the node you want to work with in this case an anchor element
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

_YUI3_'s _node_ module wraps the _DOM_ in a rich set of useful functions. It
allows us to use the same methods even on very old browsers (e.g. I.E. 6,
Android 2.x browser). There are a whole list of additional methods you may find
convienent. A good place to begin your exploration is at
[yuilibrary.com/yui/docs/node](http://yuilibrary.com/yui/docs/node). There are
methods that make quick work of interacting with CSS classes and styles as well
as locations (i.e. x,y coordinates) on the page. Remember best practice is to
use CSS to control the view and layout and only resort to JavaScript if there
isn't a CSS alternative.


Now that you've seen a little of _YUI_ we're going to put what we've shown to
use and expand on it through a series of exercises. In each exercise you'll be
asked to use both what you know and also to lookup and find something on
[yuilibrary.com](http://yuilibrary.com) that will help you expand beyond the
specifics discussed previously.

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
            <!-- get YUI3 on the page, and a script element for your code -->
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


Using _YUI3_ update content in the webpage every five seconds displaying the
current time manipulate the CSS classes attach to the element showing the time.


##### Steps

Copy _seed-file.html_ to _digital-clock-1.html_. Do the following things

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
* One approach to the solution is [digital-clock-1.html](digital-clock-1.html). Review it and compare with your own code.


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

_YUI3_ provides a robust event system which includes listening for mouse, key
and touch events. Unlike other JavaScript frameworks _YUI3_ approaches the
development problem wholistically and doesn't create a separate library for
touch devices (e.g. phones and tablets). Instead your code can work across all
devices. _YUI3_ loader also makes it efficient and how much code you download
to the device. To add support for touch guesters, mouse interaction and the
like I am introducing another module called [event][].  It will let us _listen_
for interesting things on the _DOM_.

[event]: http://yuilibrary.com/yui/docs/event/ "The Event modules provide access clicks, touch, touch guestures and keypress"


### Mouse clicks, keyboard commands and touch

Interaction with the elements in the page by a mouse, keyboard or touch triggers
an event. If you are listening for an event then you can get an event object.
This is like the normal DOM events exposed in JavaScript or in libraries like
_jQuery_. You can choose to handle the event, alter the propogation and stop
listening to it. The key is to get a handle to the object and then use the
_on()_ method to setup a callback to use when the event happens.

### Exercise

#### What happened?

- Programming goal
    - Display a button and monitor for click and flick events
- Learning objectives
    - Learn how to include the event module
    - Learn how to a listeners on elements

This is another example of showing making more sense than telling but let me
quickly outline the steps you normally take to get started.

1. Load _YUI3_ in the page
2. In your _script_ element (or JavaScript file pointed at the _script_ element) include the _event_ module.
3. In your _Y_ function select the object you want to listen to (e.g. a button) then use _on()_ to add behavior.

That is the basic approach. In this example let us create a simple webpage with
a button in the middle and a status line in the footer.  When we pick up an
event listened for then update the status line (e.g. mouse key pressed if a
your clicks on the button). This is example let's listen for clicks and flick
guesture.

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

The concept of modules is important in _YUI_. I would go so far as to say it
defines the nature of _YUI_.  _YUI_ strength and longevity has been its
flexibility in loading modules either via _script_ elements, dynamic loading or
rollups. What people are using _RequireJS_, _AMD_ for today _YUI_ has had for
years. Unlike many other browser module loaders _YUI_'s approach works both in
the browser and server side in _Node_. 


Why modules? It allows for effective code re-use.  It allows you to tailor what
code is delivered to the browser and when it should be delivered to the browser.
If you have functionality that is only needed at certain times (e.g. when
someone is logged in or is using an old version of a browser) modules help you
do that. Modules also support versioning and allow for multiple instancies with
different versions.  You can even include other non-YUI libraries (e.g. jQuery)
via _YUI_'s module and loader system.


What is a YUI module? It is JavaScript wrapped in _YUI().add()_. That is all it
is. It can be more than that (e.g. you can add version info, namespacing,
dependency information) but at its simplest form it is what you attach to _Y_
via _add()_.

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

We can re-use that module by including it in a _script_ element before our
_use()_ script element.

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

If we don't want to use an extra _script_ element then we can tell _YUI_ where
to find our module with a little bit of [configuration][].


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

* Modules help encourage code re-use
* Modules can be referenced locally via a _script_ element
* Modules can be dynamically (synchronously or asynchronously) loaded
* Modules can be local to your web server and that location can be defined through configuration
* Modules can be also submitted to _YUI_'s gallery and be hosted in Yahoo's CDN

Like DOM events working with modues is easier shown.

#### A quick aside on YUI Gallery

_YUI_ supports a whole [gallery][] of user contributed modules. Some specialized
and some general purpose. The good thing is that you only load them if you
need them.  You can specify a specific version of a module if you like. Before
something becomes part of _YUI3 core_ it is first additioned as a gallery
module.  If it is considered essential then it may become part of the core
distribution of YUI.  Additionally YUI has been going on a diet of late.
Features that have less utility have migrated out of core back into the gallery.
This allows YUI to trim the size of its core while continuing to support the
functionality it had previously in core. Being in the gallery versus being in
core is not a statement on the quality or importance of the code. Being in the
gallery means your code could be included on Yahoo's CDN which simplifies using
it for others. 

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
that to a _DOM_ element.  It should also support an optional callback
function to supported extending the module with a custom render function.
This will allow your flexibility to extend the digital clock later
(e.g. displaying as an analog clock using Canvas).

##### Steps

Create a new file called _digital-clock-2.js_. We will put our module code there.
Copy _seed-file.html_ to _digital-clock-2.html_. Do the following things

1. In _digital-clock-2.html's _script_ in-line element add configuration to point to our module.
2. In _digital-clock-2.html's _script_ in-line element update the _use()_ function to include our module.
3. Open our empty _digital-clock-2.js_ file and 
    a. create our module
    b. create a namespace
    c. create a _render()_ method that returns HTML markup as a string of our clock's current time
        - this should expect a _Date_ object as a parameter to be rendered.
    d. create a _run()_ method that uses setInterval to update our clock every second. 
        - first paramter is a CSS selector of an element which will hold our clock
        - An optional second parameter should allow for a custom render method
        - If a render method is not provided use our default _render()_ we implemented.
4. Go back to our _digital-clock-2.html_ file.
5. Inside the _Y_ on our in-line _script_ element use _Y.DigitalClock.render()_ to run our clock.

#### Notes

* We are using an external file for some of our JavaScript this time (i.e. our module)
* One possible solition is [digital-clock-2.html](digital-clock-2.html) and [digital-clock-2.js](digital-clock-2.js) holding our module code.


## Templates

### Building out a page with **Y.Handlebars**

Templates are a convient solution to generating HTML from JavaScript functions.
Templates in JavaScript can often be rendered server side as well as in the
browser. This is true of _Handlbars_ templates.  _Handlebars_ is an extention
to a popular template notation called _Mustache_.  The basic idea is your
surround the parts of the markup you want to replace with double curly brackets
surrounding matching variable name.  When you provide the template function
with an object that contains attributes that match those curly bracket variable
names then the template engine replaces the content.  Here's a quick example of
a template--


```HTML
    <div><span id="name">{{name}}</span> <span id="phonenumber">{{phonenumber}}</span></div>
```

Here is a JSON object that could be used to populate the template--

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

It is not too bad but when you get lots of fields (e.g. a person's profile, a
calendar event listing) you get lots of concatenation operations. That isn't
terribly effecient for JavaScript and if you miss a closing quotation can be
tough to debug. Templates provide a clean effective way to avoid that.

#### Embedding your handlebars template

The easiest place to embed your template is in the HTML file that needs them.
A practice of using a _script_ element has been evolving as a way of
designating the template within the page. Building on our previous example here
is a simple webpage that displays a list of names and phone numbers embedded in
a _ul_ element.  We load _YUI_ normally but include _handlebars_ as a module.
We fetch the templates using _Y.one()_ by CSS id. We compile the template and
then apply our data object the HTML element we want to update.  While our
example has one template in principle you can do this as many times as you
needed for the page's content.  With slight modification in approach you could
pre-render this server side for a pregressively enhanced experience.

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
                <ul>
                {{#data}}
                    <li><span class="name">{{name}}</span> <span class="phonenumber">{{phonenumber}}</span></li>
                {{/data}}
                </ul>
            </script>
            <!-- Define some data to put in the template -->
            <script type="text/javascript" rel="javascript">
                var data = [
                    {name: "Jane Doe", phonenumber: "+1-222-333-4567"},
                    {name: "John Doe", phonenumber: "+1-222-333-5678"},
                    {name: "Trina Doe", phonenumber: "+1-222-333-6789"}
                ];
            </script>
            <!-- get YUI3 on the page, and a script element for your code -->
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <script>
            YUI().use("node", "handlebars", function (Y) {
                // Your code goes here
                var source = Y.one("#list-template").getHTML(),
                    template = Y.Handlebars.compile(source),
                    section = Y.one("section");
                
                section.setHTML(template({data: data}));
            });
            </script>
        </body>
    </html>
```

Of course you could also define your templates outside the document and bring
them in via an [xdr][] call.


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

### Bring content into the page with **Y.io** from **io-base**

Sometimes we need data from other websites or even an [API][] in our hosting
website. It is nice to have that option in the browser and _YUI_ has a module
for that :-).  The module is called _IO_ or more specifically in your _Y_
function _Y.io_. It abstracts content input and output. That means it can be
used to load other content (e.g. RSS, XML, HTML, JSON) as well as used to push
data to a server (e.g. a forms' POST, PUT, GET or DELETE).  It is what puts
connectivity in the phrase "social web app". I.e. the social services are
usually someplace else on the network (e.g. Twitter, Facebook, G+). Since this
tutorial in focused on introducing the browser side resources of _YUI_ I am
going to show you how you might retrieve a remote [JSON][] file to populate our
previous example of phone number list.  In principle you use the same techniques
to talk to an API.  In this example a list of names and phone numbers is stored
in a file called _phonelist.json_ on our web server. Using _Y.io_ we get the
file and convert to an JavaScript object. Next the object is used along with a
template like our earlier example.


Here is our phone list data. For the purpose of this tutorial we can think of
it as an web service _API_ call.

[phonelist.json](phonelist.json)
```JavaScript
    [
        {"name": "Jane Doe", "phonenumber": "+1-222-333-4567"},
        {"name": "John Doe", "phonenumber": "+1-222-333-5678"},
        {"name": "Trina Doe", "phonenumber": "+1-222-333-6789"}
    ]
```

Here is what our HTML with in-line JavaScript would look like.

[phonelist.html](phonelist.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Phone List</title>
        </head>
        <body>
            <header>Phone List</header>
            <section>Phone list content goes here</section>
            <footer></footer>
            <!-- Define a template to render our UL list with -->
            <script id="list-template" type="text/x-handlebars-template">
                <ul>
                {{#data}}
                    <li><span class="name">{{name}}</span> <span class="phonenumber">{{phonenumber}}</span></li>
                {{/data}}
                </ul>
            </script>
            <!-- Define some data to put in the template -->
            <!-- get YUI3 on the page, and a script element for your code -->
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <script>
            // Notice we have added "io-base" to our list of modules in our "use" function.
            YUI().use("node", "handlebars", "io-base", function (Y) {
                // Your code goes here
                var source = Y.one("#list-template").getHTML(),
                    template = Y.Handlebars.compile(source),
                    section = Y.one("section");
                
                // Here are two function, one to execute on a successful data retrieval
                // the other if something goes wrong.
                function onSuccess(id, response, extra_args) {
                    var data = JSON.parse(response.responseText);

                    // Here is our render method from before.
                    section.setHTML(template({data: data}));
                }

                function onFailure(id, response, extra_args) {
                     // If this doesn't work we should say something.
                     section.setHTML("<em>ERROR</em>: cannot get the phone list at this time.");
                }

                // Since the data is not yet available we use YUI to fetch it then we can
                // use the emplate to render it into "section" as before.
                Y.io("phonelist.json", {
                    on: {
                        // We listen for an "io" success event.
                        success: onSuccess,
                        // We listen for an "io" failure event.
                        failure: onFailure
                    }
                });
            });
            </script>
        </body>
    </html>
```

Notice we still use our 

```JavaScript
    section.setHTML(template({data: data}));
```

We only wait to call it until we have data base in the _onSuccess()_ callback.
The first parameter _Y.io_ expects is a URL as a string.  This could be a
relative path  or a full URL to an API.  There are additional optional
parameters in the _Y.io_ function call.  The second one is for a configuration
object. Typically we define our success and failure callbacks here.  If we were
interacting with an API, say "POST-ing" a form's content, we would provide
additional configuration.

There are additional events emmited by _Y.io_ which can be listened for.  To
see a complete list go to the [YUI Library](http://yuilibrary.com/yui/)
documentation and [Utilities](http://yuilibrary.com/yui/utilities) and
[IO Utility](http://yuilibrary.com/yui/docs/io/). Additional you will find
Object specific docs extracted from the source code at
[YUI Library, API Docs, IO](http://yuilibrary.com/yui/docs/api/classes/IO.html)
for specific implementation details.


##### An aside about IO

_IO_'s _Y.io_ is a very configurable and flexible object.  I have shown only one
idiomatic use to keep things simple. If all you were doing in your page was
fetching _JSON_ objects then you could use _Y.io_'s  _getJSON()_ function. This
makes it even simplier. I have chosen to show you this idomatic implementation
because you can extend it to do things like submitting POSTs to a API allowing
you to do a complete [SPA][].

_IO_'s (i.e. _io-base_ in our use module list) is one of my favorite modules.
It works both in the browser and in _Node_. That gives us a common way to setup
remote API access that might be processed in a middle layer running on the
server or directly in the client web browser.

[API]: http://wikipedia.org/wiki/API "Application Programming Interface - For our purposes today a way to get data from and push data to a web service"
[JSON]: http://json.org "JavaScript-Object-Notation, a text format for easy data exchange"
[SPA]: http://en.wikipedia.org/wiki/Single_page_application "Single-Page Application"


### Exercise

#### Digital Clock with alarms

##### Steps

##### Notes

* One implementation of our Digital Clock with Alarms pull is [digital-clock-4.html](digital-clock-4.html)


## Reminders

### Should you use YUI for that?

While _YUI3_ is a very good library it is easy to get carried away. Here's some
heuristic in deciding when to use _YUI3_ (or really any JavaScript at all)

- If it is structure then use HTML
- If it is visual look and feel or layout trying solving with CSS
- If it is behavior use JavaScript if you can not achieve it in HTML and CSS
- If you can do solve it simply in plain JavaScript then do so. 
- If it is more complicated or can benefit from modularization consider _YUI3_
