

### [Solution Digital Clock](solution-digital-clock.html)


Here is one approach to the digital clock problem.  Ideally you have built yours first before reading this but this is provided
both as a review of what you discovered and as a comparison.

[digital-clock.html](digital-clock.html)
```JavaScript
    <!DOCTYPE html>
    <html>
        <head>
            <title>Digital Clock</title>
        </head>
        <body>
            <header>Header info goes here</header>
            <section id="clock">Main content goes here</section>
            <footer>Footer things go here</footer>
            <!-- get YUI3 on the page, and a script block for your code -->
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <script>
            YUI().use("node", function (Y) {
                // Your code goes here
                var clock = Y.one("#clock");

                // Update the clock every five seconds
                setInterval(function () {
                    clock.set("text", new Date());
                }, 5000);
            });
            </script>
        </body>
    </html>
    
```


