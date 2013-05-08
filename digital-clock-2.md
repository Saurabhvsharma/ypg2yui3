
## What Time is it?

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

### Steps

Create a new file called _digital-clock.js_. We will put our module code there.
Copy _seed-file.html_ to _digital-clock-2.html_. Do the following things

1. In _digital-clock-2.html's _script_ in-line element add configuration to point our our module.
2. In _digital-clock-2.html's _script_ in-line element update the _use()_ function to include our module.
3. Open our empty digital-clock.js file and create our module
    a. create a namespace
    b. create a _render()_ method that returns HTML markup as a string with current time
        - this should expect a _Date_ object as a parameter to be rendered.
    c. create a _run()_ method that uses setInterval to update our clock every second. 
        - first paramter is a CSS selector of an element which will hold our clock
        - second parameter should be the number of milliseconds between updates
        - an optional third parameter should allow for a custom render method overriding our default render method
    d. Include a requirement for our module of _node_ so we can update the _DOM_ elements targetted.
4. Go back to our _digital-clock-2.html_ file.
5. Inside the _Y_ on our in-line _script_ element use _Y.DigitalClock.render()_ to run our clock.

### Solution

Here is the markup for our main HTML page. Note the use of a configuration in _YUI()_.

[solution-digital-clock-2.html](solution-digital-clock-2.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Digital Clock 2</title>
            <style></style>
        </head>
        <body>
            <header>Digital Clock 2</header>
            <section id="clock">Main content goes here</section>
            <footer>The section above should display the date and time. It should change every second.</footer>
            <!-- get YUI3 on the page, and a script block for your code -->
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <script>
            // WE configure our _YUI()_ this time.
            YUI({
                modules: {
                    "digital-clock": {
                        fullpath: "digital-clock.js"
                    }
                }
            }).use("node", "digital-clock", function (Y) {
                // Your code goes here
                var clock = new Y.DigitalClock();
                clock.run("#clock", 1000);
            });
            </script>
        </body>
    </html>
```

That is the easy part. Now let us create our module. After we define
our modules core we then include a version number (e.g. 0.0.1) and
a configuration options object including the required list of modules
we need to run.

[digital-clock.js](digital-clock.js)
```JavaScript
    // Define out module using _YUI.add()_
    YUI.add("digital-clock", function (Y) {
        // Create our namespace
        Y.namespace("DigitalClock");

        // Setup a constructor with reasonable defaults
        function DigitalClock () {};
        DigitalClock.prototype.interval = 1000;
        DigitalClock.prototype.int_id = null;
        DigitalClock.prototype.selector = null;
        DigitalClock.prototype.render = function (now) {
            this.element.set("text", now.toString());
        };
        DigitalClock.prototype.run = function (selector, interval, renderCallback) {
            var self = this;

            this.element = Y.one(selector);
            if (typeof renderCallback !== "undefined") {
                this.render = render;
            }
            this.int_id = setInterval(function () {
                self.render(new Date());                
            }, interval);
            return this.int_id;
        };
        DigitalClock.prototype.stop = function () {
            if (this.int_id) {
                clearInterval(this.int_id);
            }
        };

        // Add our new Object as DigitalClock
        Y.DigitalClock = DigitalClock;
    },
    // Semantic Version number
    "0.0.1",
    // Configuration with list of modules we 'require' 
    {requires: ["node"]});
```


