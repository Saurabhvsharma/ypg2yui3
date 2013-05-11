
## Digital Clock with Templates

### Steps

Copy _digital-clock-2.js_ to _digital-clock-3.js_. We will continue our improvements there.
Copy _digital-clock-2.html_ to _digital-clock-3.html. Do the following things

1. In _digital-clock-3.html_ add to _script_ blocks for our templates
    a. One should have an _id_ attribute containing _digital-view_ and the other _analog-view_.
    b. Both _script_ blocks should have a _type_ attribute with _text/x-handlebars-template_.
2. In _digital-clock-3.html's _script_ in-line element add configuration to point our our module (i.e. digital-clock-3.js).
3. In _digital-clock-3.html's _script_ in-line element update the _use()_ function to include our module.
4. Open _digital-clock-3.js_ file and modify our module to expect a template for layout
    a. Update our _render()_ method to accept a compiled _Handlebars_ template.
    b. Update our _run()_ method to include source for the _Handlebars_ template
        - first paramter is a CSS selector of an element which will hold our clock
        - second parameter should be the number of milliseconds between updates
        - third parameter is either a _selector_, template source code, or compiled template
    c. Update the requires statement to include _handlebars_.
5. Go back to our _digital-clock-3.html_ file.
6. Inside the _Y_ on our in-line _script_ element use _Y.DigitalClock()_ to create our _clock_ object and _run()_ to run it.


### Solution

Here is the markup for our main HTML page. Note the use of a configuration in _YUI()_.

[solution-digital-clock-3.html](solution-digital-clock-3.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Digital Clock 3</title>
            <style></style>
        </head>
        <body>
            <header>Digital Clock 3</header>
            <section id="clock">Main content goes here</section>
            <footer>The section above should display the date and time. It should change every second.</footer>
            <!-- Here are our handlebars templates -->
            <script id="digital-view" type="text/x-handlebars-template">
                {{time}}
            </script>
            <!-- get YUI3 on the page, and a script block for your code -->
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <script>
            // WE configure our _YUI()_ this time.
            YUI({
                modules: {
                    "digital-clock": {
                        fullpath: "digital-clock-3.js"
                    }
                }
            }).use("node", "digital-clock", function (Y) {
                // Your code goes here
                var clock = new Y.DigitalClock();
                clock.run("#clock", 1000, "#digital-view");
            });
            </script>
        </body>
    </html>
```

That is the easy part. Now let us update our module. After we define
our modules core we then include a version number (e.g. 0.0.3) and
a configuration options object including the required list of modules
we need to run.

[digital-clock-3.js](digital-clock-3.js)
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
        DigitalClock.prototype.run = function (selector, interval, template) {
            var self = this;

            this.element = Y.one(selector);
            if (typeof template === "function") {
                this.render = template;
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
    "0.0.3",
    // Configuration with list of modules we 'require' 
    {requires: ["node", "handlebars"]});
```


