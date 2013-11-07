
## Starting

### The minimum to pull _YUI3_ into the webpage

_YUI_ needs to be available to the webpage to be useful. Fortunately this 
is [easy][]. You use a _script_ element to include it from Yahoo's CDN. 
Let us build a simple webpage  using _YUI3_ to change the pages' _title_ 
to "Hello World" and the first _h1_ to "Yippee! It worked.".

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
   			<script src="http://yui.yahooapis.com/3.13.0/build/yui/yui-min.js"></script>
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

Save this as the file _getting-started.html_. Point your web browser at 
the page and take a look.

You should now see your first _YUI3_ enabled web page.

