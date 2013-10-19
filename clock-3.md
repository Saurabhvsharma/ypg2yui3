
## Clock with Templates

### Steps

Copy _clock-2.js_ to _clock-3.js_. We will continue our improvements there.
Copy _clock-2.html_ to _clock-3.html. Do the following things

1. In _clock-3.html_ add to _script_ blocks for our templates
    a. One should have an _id_ attribute containing _view_ and the other _analog-view_.
    b. Both _script_ blocks should have a _type_ attribute with _text/x-handlebars-template_.
2. In _clock-3.html's _script_ in-line element add configuration to point our our module (i.e. clock-3.js).
3. In _clock-3.html's _script_ in-line element update the _use()_ function to include our module.
4. Open _clock-3.js_ file and modify our module to expect a template for layout
    a. Update our _render()_ method to accept a compiled _Handlebars_ template.
    b. Update our _run()_ method to include source for the _Handlebars_ template
        - first paramter is a CSS selector of an element which will hold our clock
        - second parameter should be the number of milliseconds between updates
        - third parameter is either a _selector_, template source code, or compiled template
    c. Update the requires statement to include _handlebars_.
5. Go back to our _clock-3.html_ file.
6. Inside the _Y_ on our in-line _script_ element use _Y.Clock()_ to create our _clock_ object and _run()_ to run it.


### Solution

Here is the markup for our main HTML page. Note the use of a configuration in _YUI()_.

[solution-clock-3.html](solution-clock-3.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title> Clock 3</title>
            <style></style>
        </head>
        <body>
            <header> Clock 3</header>
            <section id="clock">Main content goes here</section>
            <footer>The section above should display the date and time. It should change every second.</footer>
            <!-- Here are our handlebars templates -->
            <script id="view" type="text/x-handlebars-template">
                {{time}}
            </script>
            <!-- get YUI3 on the page, and a script block for your code -->
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <script>
            // WE configure our _YUI()_ this time.
            YUI({
                modules: {
                    "clock": {
                        fullpath: "clock-3.js"
                    }
                }
            }).use("node", "clock", function (Y) {
                // Your code goes here
                var clock = new Y.Clock();
                clock.run("#clock", 1000, "#view");
            });
            </script>
        </body>
    </html>
```

That is the easy part. Now let us update our module. After we define
our modules core we then include a version number (e.g. 0.0.3) and
a configuration options object including the required list of modules
we need to run.

[clock-3.js](clock-3.js)
```JavaScript
    /*jslint browser: true, indent: 4 */
    /*global YUI */
    // Define out module using _YUI.add()_
    YUI.add("clock", function (Y) {
        "use strict";
        // Create our namespace
        Y.namespace("Clock");

        // Setup a constructor with reasonable defaults
        function Clock() {
            Y.log('clock created', 'deubg');
        }
        Clock.prototype.interval = 1000;
        Clock.prototype.int_id = null;
        Clock.prototype.selector = null;
        Clock.prototype.render = function (now) {
            this.element.set("text", now.toString());
        };
        Clock.prototype.run = function (selector, interval, template) {
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
        Clock.prototype.stop = function () {
            if (this.int_id) {
                clearInterval(this.int_id);
            }
        };

        // Add our new Object as Clock
        Y.Clock = Clock;
    },
        // Semantic Version number
        "0.0.3",
        // Configuration with list of modules we 'require' 
        {requires: ["node-base", "handlebars"]});
```


