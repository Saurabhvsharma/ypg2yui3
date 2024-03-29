
## Clock No. 1

- Programming goal
    + build a simple clock in the webpage
- Learning objective 
    + Explore the _node_ module of _YUI_
    + Use additional methods besides _Y.get()_, _Y.set()_ and _Y.setHTML()_.


Using YUI3 update content in the webpage every five seconds displaying the current time manipulate
the CSS classes attach to the element showing the time.



### Steps

Copy _seed-file.html_ to _clock.html_. Do the following things

- Add an _id_ attribute of "clock" to _section_.
- Add a _style_ element in the _head_ of the document setting font size of section to "2em"
- In your _style_ element create two CSS classes
    + .now-blue { color: white; background-color: blue }
    + .now-red { color: white; background-color: red }
- Go to [yuilibrary.com](http://yuilibrary.com/yui/docs/node) and find three methods for checking if a class is present, adding a class and removing a class.
- Inside your _Y_ function use a JavaScript _setInterval()_ to update the innerHTML with the current time every five seconds.
- Each time your update the time swap the classes between _now-blue_ and _now-red_.
- Load the webpage and watch to see if the section innerHTML changes every five seconds and also if the colors change too.


### Solution

Here is one approach to the clock problem.  Ideally you have built yours first before reading this but this is provided
both as a review of what you discovered and as a comparison.

[solution-clock.html](solution-clock.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Clock</title>
            <style>
            font-size: 2em;
            .red {
                background-color: red;
                color: white;
            }

            .blue {
                background-color: blue;
                color: white;
            }
            </style>
        </head>
        <body>
            <header>Clock</header>
            <section id="clock" class="blue">Main content goes here</section>
            <footer>The section above should display the date and time. It should change every second.</footer>
            <!-- get YUI3 on the page, and a script block for your code -->
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <script>
            YUI().use("node", function (Y) {
                "use strict";
                // Your code goes here
                var clock = Y.one("#clock");

                clock.set("text", new Date());
                clock.addClass("blue");
                // Update the clock every five seconds
                setInterval(function () {
                    if (clock.hasClass("blue")) {
                        Y.log("does hasClase(blue)", "debug");
                        Y.log(clock.hasClass("blue"), "debug");
                        clock.replaceClass("blue", "red");
                    } else {
                        Y.log("does not hasClase(blue)", "debug");
                        Y.log(clock.hasClass("red"), "debug");
                        clock.replaceClass("red", "blue");
                    }
                    clock.set("text", new Date());
                }, 1000);
            });
            </script>
        </body>
    </html>
```

With the exception of adding the _setInterval()_ block this looks allot like the first several examples.
