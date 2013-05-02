

### [Solution Digital Clock](solution-digital-clock.html)


Here's one approach to the digital clock problem.  Ideally you've built yours first before reading this but this is provided
both as a review of what you discovered and as 

[digital-clock.html](digital-clock.html)
```JavaScript
    <!DOCTYPE html>
    <html>
        <head>
            <title>Digital Clock</title>
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
    var all_anchors = Y.all("a"), 
        div_results = Y.one("#results");
    
```


