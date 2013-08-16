
##  Clock with Alarms

Copy _clock-3.js_ to _clock-4.js_. We will continue our improvements there.
Copy _clock-3.html_ to _clock-4.html. Do the following things.

### Steps

1. In _clock-4.html_ add two _script_ blocks for our templates
    a. One should have an _id_ attribute containing _clock-view_ and the other _alarm-view_.
    b. Both _script_ blocks should have a _type_ attribute with _text/x-handlebars-template_.
2. In _clock-4.html_'s _script_ in-line element add configuration to point our our module (i.e. clock-4.js).
3. In _clock-4.html_'s _script_ in-line element update the _use()_ function to include our module.
4. Open _clock-4.js_ file and modify our module to expect a template for layout
    a. Update our _render()_ method to accept a compiled _Handlebars_ template.
    b. Update our _run()_ method to include source for the _Handlebars_ template
        - first paramter is a CSS selector of an element which will hold our clock
        - second parameter should be the number of milliseconds between updates
        - third parameter is either a _selector_, template source code, or compiled template
    c. Update the requires statement to include _handlebars_.
5. Go back to our _clock-4.html_ file.
6. Inside the _Y_ on our in-line _script_ element use _Y.Clock()_ to create our _clock_ object and _run()_ to run it.


### Solution

We stored our alarms as a _JSON_ file on our web server.  I have included alarms below for 
each weekday. I have chosen a simple data structure of week days with a list of individual alarms.
Each alarm has a label we can display at the appropriate time.

[alarms.json](alarms.json)
```JavaScript
    [
        {"day": "Monday", "time": "6:00 am", "label": "Wake up! It is a work day."},
        {"day": "Tuesday", "time": "6:00 am", "label": "Wake up!"},
        {"day": "Wednesday", "time": "6:00 am", "label": "Wake up!"},
        {"day": "Thursday", "time": "6:00 am", "label": "Wake up!"},
        {"day": "Friday", "time": "6:00 am", "label": "Wake up!"},
        {"day": "Saturday", "time": "8:30 am", "label": "Saturday, I can sleep in."},
        {"day": "Sunday", "time": "8:30 am", "label": "Sunday, I can sleep in."}
    ]
```

Here is the markup for our main HTML page. Note the use of a configuration in _YUI()_.

[solution-clock-4.html](solution-clock-4.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Clock 4</title>
            <style></style>
        </head>
        <body>
            <header>Clock 4</header>
            <section id="clock">Clock display goes here</section>
            <section id="alarm">Alarm list goes here</section>
            <footer>The section above should display the date and time. It should change every second.</footer>
            <!-- Here are our handlebars templates -->
            <script id="clock-view" type="application/x-handlebars-template">
                {{time}}
            </script>
            <script id="alarm-view" type="application/x-handlebars-template">
                <ul>
                {{#alarms}}
                    <li id="alarm_{{@index}}"><span class="day-of-week">{{day}}</span><span class="time">{{time}}</span> <span class="label">{{label}}</span></li>
                {{/alarms}}
                </ul>
            </script>
            <!-- get YUI3 on the page, and a script block for your code -->
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <script>
            // WE configure our _YUI()_ this time.
            YUI({
                modules: {
                    "clock": {
                        fullpath: "clock-4.js"
                    }
                }
            }).use("node", "clock", function (Y) {
                // Your code goes here
                var clock = new Y.Clock();

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
                        selectors: {clock: "#clock", alarm: "#alarm"},
                        interval: 1000,
                        template_selectors: {clock: "#clock-view", alarm: "#alarm-view"}
                    }
                });
            });
            </script>
        </body>
    </html>
```

That is the easy part. Now let us update our module. After we define
our modules core we then include a version number (e.g. 0.0.4) and
a configuration object including the required list of modules we need to run.

[clock-4.js](clock-4.js)
```JavaScript
    // Define out module using _YUI.add()_
    YUI.add("clock", function (Y) {
        // Create our namespace
        Y.namespace("Clock");

        // This is a private function so doesn't need to be added to
        // the Y.Clock instance.
        function checkForAlarm(alarms, previous_time, current_time) {
            alarms.forEach(function (alarm, i) { 
                var weekDays = [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ],
		    today = new Date(),
		    dayOfWeek = weekDays[today.getDay()];

                if (alarm.day === dayOfWeek) {
                   //FIXME: handle case of where we set alarm if the hour hans't passed.
                } else {
                   //FIXME handle case where we're not setting this alarm
                }
            });
        }
        
        // Setup a constructor with reasonable defaults
        function Clock () {};
        Clock.prototype.interval = 1000;
        Clock.prototype.int_id = null;
        Clock.prototype.selector = null;
        Clock.prototype.render = function (now) {
            this.element.set("text", now.toString());
        };
        Clock.prototype.run = function (selector, interval, template, alarms) {
            var self = this, previous_time = new Date(), current_time;

            this.element = Y.one(selector);
            if (typeof template === "function") {
                this.render = template;
            }
            // Process our alarms data structure and create a
            // queue of alarms, then inside setInterval check
            // if they have passed and pop the alarm off the list if
            // it has.
            this.int_id = setInterval(function () {
                current_time = new Date();
                self.render(current_time);
                previous_time = current_time;
                checkforAlarm(alarms, previous_time, current_time);
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
    "0.0.4",
    // Configuration with list of modules we 'require' 
    {requires: ["node", "handlebars"]});
```
