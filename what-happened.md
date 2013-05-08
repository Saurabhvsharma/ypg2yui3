
#### What happened?

This is another example of showing making more sense than telling but let me quickly outline the
steps you normally take to get started.

1. Load _YUI3_ in the page
2. In your Script blog (or JavaScript file using _YUI3_) include the _event_ module.
3. In your _Y_ function select the object you want to listen to (e.g. a button) then use _on()_ to add behavior.

That is the basic approach. In this example let us create a simple webpage with a button in the middle and
a status line in the footer.  When we pick up an event listened for then update the status line (e.g. mouse
key pressed if a your clicks on the button). This is example let us listen for mouse clicks and the flick touch guesture.

#### Steps

Copy _seed-file.html_ to _what-happened.html_. Do the following things

1. Add a _button_ element to the _section_ element in our HTML markup
2. Update the line where we _use()_ _YUI_ and generate our _Y_ function to to include the _event_ module.
3. Select our button using _Y.one()_
4. Add listeners via _on()_ method for click and flick

### Solution

Like the digital clock this is pretty simple.  We are doing all the lifting in the _Y_ function.
In this case besides using _Y.one()_ to get a handle to our button we are also add simple
listener callbacks with the _on()_ method.

Notice the line in our script block _YUI().use(...)_.  After _node_ and before our _Y_ function
is the _event_ node.  Basically the _use()_ function takes a list of module names, loads the 
module and then passes that to the last parameter which is a function via our _Y_ object.

[solution-what-happened.html](solution-what-happened.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>What Happened?</title>
        </head>
        <body>
            <header>What Happened?</header>
            <section>
                <button>Press me</button>
                <p>press, click, touch or flick the button please.</p>
                <div id="status">Status messages will show here.</div>
            </section>
            <footer></footer>
            <!-- get YUI3 on the page, and a script block for your code -->
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <script>
            // Notice we are adding the event module in our use() parameters. 
            YUI().use("node", "event", function (Y) {
                // Your code goes here
                var button = Y.one("button"),
                    status = Y.one("#status");
                // Let's add our listeners
                button.on("click", function (e) {
                    status.setHTML("You clicked me.");
                });

                button.on("flick", function (e) {
                    status.setHTML("You flicked me.");
                });
            });
            </script>
        </body>
    </html>
```

Here are some helpful links from yuilibrary--

* [click](http://yuilibrary.com/yui/docs/event/) - general event module
* [flick](http://yuilibrary.com/yui/docs/event/gestures.html) - guesture examples
* [custom](http://yuilibrary.com/yui/docs/event-custom/index.html) - custom event examples


