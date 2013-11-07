
## Selectors

### Accessing parts of a webpage

[CSS][2] selectors allow you to easily target elements in a webpage.
_YUI3_ like other browser libraries allows you to access elements in
a webpage using CSS selectors. This typically is by indentifying an 
element via an _id_ or _class_ attribute.  You may also use CSS psuedo 
classes and element relationships to target a specific element in the 
page (e.g. the second _li_ contained in a _ul_ list). 

There is a cost to caculating where in the _DOM_ your element is. The 
best practice in _YUI3_ like other libraries is save a reference to
those elements you need to access more than once. This can be done by 
assigning the reference to a variable. Here's an example _script_ 
element showing the assignment and use of the saved elements.

[getting-started-improved.js](getting-started-improved.js)
```HTML
    YUI().use("node", function (Y) {
        "use strict";
        var title = Y.one("title"),
            h1 = Y.one("h1");

        title.setHTML("Hello World - improved.");
        h1.setHTML("Yippee! I can be more efficient.");
    });
```

Here's a modified version on our getting started page.

[getting-started-improved.html](getting-started-improved.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head><title>Getting Started Improved</title></head>
        <body>
            <h1>Getting Started Improved</h1>
            <p>When YUI3 is loaded the title and h1 will be updated.</p>
            <script src="http://yui.yahooapis.com/3.13.0/build/yui/yui-min.js"></script>
            <script src="getting-started-improved.js"></script>
        </body>
    </html>
```

_YUI3_ provides two functions that take a selector. The first is _Y.one()_. 
It will give you the first element in the [DOM][3] matching that selector. 
In our example above that was _title_ and _h1_.  If you had more than 
one _h1_ it would only give the first _h1_ found. Usually this is what 
you want.  Sometimes you want all the elements matching a selector 
(e.g. all the anchor elements in a page).  To get that you use _Y.all()_.
That returns a list of elements. It is easiest to explain by showing.  
Let us create a short document with a list of links to YUI3 resources. 
Next we'll update part of the page to indicate the links we found.

[selecting-all.html](selecting-all.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Y.all() Example</title>
        </head>
        <body>
	    <!-- This is our ordered list of anchored tags -->
            <ol>
                <li><a href="http://yuilibrary.com">YUI Library</a></li>
                <li><a href="http://github.com/yui/yui3">YUI3 on Github.com</a></li>
                <li><a href="http://yui.yahooapis.com/3.13.0/build/yui/yui-min.js">Seed File</a> for YUI3 at the CDN</li>
            </ol>
            <!-- This div is where we will display what we find -->
            <div id="results"></div>
            <!-- load YUI3 on the page as normal -->
            <script src="http://yui.yahooapis.com/3.13.0/build/yui/yui-min.js"></script>
            <!-- Now write our script to cound the anchor elements and update div.results -->
            <script>
                // Load the node module and create our Y object.
                YUI().use("node", function (Y) {
                    "use strict";
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

That's it. Take a look at this results with your 
[browser](selecting-all.html). You should see, very quickly I might add,
a sentence indicating the links found.

[2]: http://en.wikipedia.org/wiki/CSS "Cascading Style Sheets, they way to control how a webpage looks."
[3]: http://en.wikipedia.org/wiki/Document_Object_Model "The Object which the browser uses to allow access to parts of a webpage."


### innerHTML and attributes

JavaScript in the browser is useful for orchestrating behaviors. To do 
this we need to get the values inside HTML elements as well as their
attributes. This is easy with _YUI3_. The [node] module provides us with a
rich set of methods for interacting with the _DOM_ but you only need a 
few to get useful work done. This is done in two steps

1. Get the node you want to work with via _Y.one()_ or _Y.all()_
2. use _Y.get()_, _Y.set()_, and _Y.setHTML()_ to interact with that element. 


[steps-one-two.js](steps-one-two.js)
```JavaScript
    YUI().use("node", function (Y) {
        "use strict";
        // Step 1, get a handle to the node you want to work with in 
        // this case an anchor element
        var anchor = Y.one("a"),
            // Now get the value of the href attribute.
            href = anchor.get("href"),
            // Get the innerHTML of the anchor
            innerHTML = anchor.get("innerHTML");

        // Too see the results in the JavaScript console of the browser 
        // use Y.log()
        Y.log("The href is " + href);
        Y.log("The innerHTML is " + innerHTML);
        // Step 2, use setHTML() to change the value wrapped by 
        // the anchor
        anchor.setHTML('(links to: <em>' + href + '</em>) '  + innerHTML);
    });
```

Here's is an HTML page where that [interaction](steps-one-two.html)
can take place.

[steps-one-two.html](steps-one-two.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head><title>Steps One, Two</title>
        <body>
            <h1>Steps One, Two</h1>
            <p><a href="steps-one-two.html">An example anchor tag.</a></p>
            <script src="http://yui.yahooapis.com/3.13.0/build/yui/yui-min.js"></script>

            <script src="steps-one-two.js"></script>
        </body>
    </html>
```

[node]: http://yuilibrary.com/yui/docs/node/ "The YUI3 Node module provides access to DOM elements."

_YUI3_'s _node_ module wraps the _DOM_ in a rich set of useful functions. 
It allows us to use the same methods even on very old browsers (e.g. I.E. 6,
Android 2.x browsers). There are a whole list of additional methods you 
may find convienent. A good place to begin your exploration is at
[yuilibrary.com/yui/docs/node](http://yuilibrary.com/yui/docs/node). There 
are methods that make quick work of interacting with CSS classes and styles 
as well as locations (i.e. x,y coordinates) on the page. Remember best 
practice is to use CSS to control the view and layout and only resort to 
JavaScript if there isn't a CSS alternative.


Now that you've seen a little of _YUI_ we're going to put what we've shown 
to use and expand on it through a series of exercises. In each exercise 
you'll be asked to use both what you know and also to lookup and find 
something on [yuilibrary.com](http://yuilibrary.com) website that will 
help you expand beyond the specifics discussed previously.

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
            <script src="http://yui.yahooapis.com/3.13.0/build/yui/yui-min.js"></script>
            <script>
            YUI().use("node", function (Y) {
                // In the YUI community this location is often
                // referred to as the "Y function"

                // Your code goes here
            });
            </script>
        </body>
    </html>
```

### Exercises

#### Clock No. 1

- Programming goal
    + build a minimal clock webpage
- Learning objectives
    + Explore the _node_ module of _YUI3_
    + Use additional methods besides _Y.get()_, _Y.set()_ and _Y.setHTML()_.


Using _YUI3_ update content in the webpage every few seconds displaying 
the current time manipulate the CSS classes attach to the element showing 
the time.


##### Steps

Copy _seed-file.html_ to _clock-1.html_. Do the following things

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

* In these tutorials I have opted for [in-line][4] code for convienence and simplicity
* One approach to the solution is [clock-1.html](clock-1.html). Review it and compare with your own code.


#### Navigation list

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

* One approach to the solution is [where-am-i.html](where-am-i.html)


[4]: https://en.wikipedia.org/wiki/Inline_expansion "In-line is not necessarily a 'best practice' particularlly in more complicated websites and applications."

