
## Digital Clock with Alarms

### Steps

Copy _digital-clock-3.js_ to _digital-clock-4.js_. We will continue our improvements there.
Copy _digital-clock-3.html_ to _digital-clock-4.html. Do the following things

1. In _digital-clock-4.html_ add to _script_ blocks for our templates
    a. One should have an _id_ attribute containing _digital-view_ and the other _analog-view_.
    b. Both _script_ blocks should have a _type_ attribute with _text/x-handlebars-template_.
2. In _digital-clock-4.html's _script_ in-line element add configuration to point our our module (i.e. digital-clock-4.js).
3. In _digital-clock-4.html's _script_ in-line element update the _use()_ function to include our module.
4. Open _digital-clock-4.js_ file and modify our module to expect a template for layout
    a. Update our _render()_ method to accept a compiled _Handlebars_ template.
    b. Update our _run()_ method to include source for the _Handlebars_ template
        - first paramter is a CSS selector of an element which will hold our clock
        - second parameter should be the number of milliseconds between updates
        - third parameter is either a _selector_, template source code, or compiled template
    c. Update the requires statement to include _handlebars_.
5. Go back to our _digital-clock-3.html_ file.
6. Inside the _Y_ on our in-line _script_ element use _Y.DigitalClock()_ to create our _clock_ object and _run()_ to run it.


### Solution

We stored our alarms as a _JSON_ file on our web server.  I have included alarms below for 
each weekday. I have chosen a simple data structure of week days with a list of individual alarms.
Each alarm has a label we can display at the appropriate time.

[alarms.json](alarms.json)
```JavaScript
    {
        "Monday": [{"time": "6:00 am", "label": "Wake up! It is a work day."}],
        "Tuesday": [{"time": "6:00 am", "label": "Wake up!"}],
        "Wednesday": [{"time": "6:00 am", "label": "Wake up!"}],
        "Thursday": [{"time": "6:00 am", "label": "Wake up!"}],
        "Friday": [{"time": "6:00 am", "label": "Wake up!"}],
        "Saturday": [{"time": "8:30 am", "label": "Saturday, I can sleep in!"}],
        "Sunday": [{"time": "8:30 am", "label": "Sunday, I can sleep in!"}],

    }
```

Here is the markup for our main HTML page. Note the use of a configuration in _YUI()_.

[solution-digital-clock-4.html](solution-digital-clock-4.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Digital Clock 4</title>
            <style></style>
        </head>
        <body>
            <header>Digital Clock 4</header>
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
                        fullpath: "digital-clock-4.js"
                    }
                }
            }).use("node", "digital-clock", function (Y) {
                // Your code goes here
                var clock = new Y.DigitalClock();

                function updateAlarms (id, response, arguments) {
                    var clock = arguments.clock,
                        selector = arguments.selector,
                        update_in_milliseconds = arguments.update_in_milliseconds,
                        template_selector = arguments.template_selector,
                        alarms = JSON.parse(response.responseText);
                   // Run our clock with alarms
                   clock.run(selector, interval, template_selector, alarms);
                }

                function noAlarms (id, response, arguments) {
                    var clock = arguments.clock,
                        selector = arguments.selector,
                        update_in_milliseconds = arguments.update_in_milliseconds,
                        template_selector = arguments.template_selector, 
                        section = Y.one(arguments.selector);

                    // Run our clock without alarms
                    section.set("text", "No alarms available. Try again later.");
                    clock.run(selector, interval, template_selector);
                }
                
                // Now configure and get our alarms data.
                Y.io("alarms.json", {
                    on: {
                        success: updateAlarms,
                        failure: noAlarms
                    },
                    arguments: {
                        clock: clock,
                        selector: "#digital-view",
                        interval: 1000,
                        template_selector: "#digital-view-template"
                    }
                });
            });
            </script>
        </body>
    </html>
```

That is the easy part. Now let us update our module. After we define
our modules core we then include a version number (e.g. 0.0.4) and
a configuration options object including the required list of modules
we need to run.

[digital-clock-4.js](digital-clock-4.js)
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
        DigitalClock.prototype.run = function (selector, interval, template, alarms) {
            var self = this;

            this.element = Y.one(selector);
            if (typeof template === "function") {
                this.render = template;
            }
            // Process our alarms data structure and create a
            // queue of alarms, then inside setInterval check
            // if they have passed and pop the alarm off the list if
            // it has.
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
    "0.0.4",
    // Configuration with list of modules we 'require' 
    {requires: ["node", "handlebars"]});
```

