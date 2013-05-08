
## Exercise Where Am I?

- Programming goal
    + compare the page name in _window.location.href_ with the _href_ in a _ul_ list of anchors elements
    + if there is a match set replace the anchor element with a span containing a _here_ class.
- Learning objectives
    + Work with a list of elements
    + Look into each one
    + Replace elements as well as its innerHTML


### Steps 

Do the following things

- Add a _style_ block in _head_
- Add a _nav_ element before section
- I the name section add a list of seven URLs, one should be for the webpage _where-am-i.html_
- in the _style_ element of _head_ add a CSS class named "here", that swaps the foreground and background colors
- Look up examples for using _Y.all()_ and _Y.each() at [yuilibrary.com](http://yuilibrary.com/yui/docs/node)
- In your _Y_ function use CSS solitor to get a list of ALL _li_ elements with _anchors_
- For each _li_ get the containing anchor, check if the _href_ points at the same _href_ as in _window.location.href
    + If so update the _li_ so it has a span instead of an anchor and a class of _here_

### Solution

Copy _seed-file.html_ to _where-am-i.html_.  Add the nav markup and styles blocks in _where-am-i.html_.

```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Where am I?</title>
            <style>
                li {
                    color: blue;
                    background-color: white;
                }
                
                .here {
                    color: white;
                    background-color: blue;
                }
            </style>
        </head>
        <body>
            <header>Where am I?</header>
            <nav>
                <ol>
                    <li><a href="http://example.com/1">One</a></li>
                    <li><a href="http://example.com/2">Two</a></li>
                    <li><a href="http://example.com/3">Three</a></li>
                    <li><a href="http://example.com/4">Four</a></li>
                    <li><a href="where-am-i.html">Am I here?</a></li>
                    <li><a href="http://example.com/6">Six</a></li>
                    <li><a href="http://example.com/7">Seven</a></li>
                </ol>
            </nav>
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
```

Now were ready to start working on a _Y_ function where the behavior takes place. We need to
get a list of all _li_. Working inside our _Y_ let's save the handles to the elements.

```JavaScript
            <script>
            YUI().use("node", function (Y) {
                // Your code goes here
                var allLi = Y.all("nav ol > li");
                // Now we should have a list to all the li
            });
            </script>
    
```

We can iterate over that list and see if we find a match. During development I have found it helpful
to use _Y.log()_ to write information to the consule. Before we have a whole solution I will do that here.
Our JavaScript block should now look something like--

```JavaScript
            <script>
            YUI().use("node", function (Y) {
                // Your code goes here
                var allLi = Y.all("nav ol > li");
                // Now we should have a list to all the li
                allLi.each(function (li) {
                    var anchor = li.one("a");
                    // Write the li to the console
                    Y.log(li, "debug");
                    // Write our anchor element to console
                    Y.log(anchor, "debug");
                });
            });
            </script>
```

We can add a check of the _href_ attribute of the _anchor_ and decide if we need to change things.

```JavaScript
            <script>
            YUI().use("node", function (Y) {
                // Your code goes here
                var allLi = Y.all("nav ol > li");
                // Now we should have a list to all the li
                allLi.each(function (li) {
                    var anchor = li.one("a");
                    // Write the li to the console
                    Y.log(li, "debug");
                    // Write our anchor element to console
                    Y.log(anchor, "debug");
                    if (anchor.get("href") === window.location.href) {
                        Y.log("Need to update the anchor", "debug");
                    }
                });
            });
            </script>
```

If we add in chaning the _innerHTML_ of the _li_ as needed we ready to put this all together--

[solution-where-am-i.html](solution-where-am-i.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Where am I?</title>
            <style>
                li {
                    color: blue;
                    background-color: white;
                }
                
                .here {
                    color: white;
                    background-color: blue;
                }
            </style>
        </head>
        <body>
            <header>Where am I?</header>
            <nav>
                <ol>
                    <li><a href="http://example.com/1">One</a></li>
                    <li><a href="http://example.com/2">Two</a></li>
                    <li><a href="http://example.com/3">Three</a></li>
                    <li><a href="http://example.com/4">Four</a></li>
                    <li><a href="where-am-i.html">Am I here?</a></li>
                    <li><a href="http://example.com/6">Six</a></li>
                    <li><a href="http://example.com/7">Seven</a></li>
                </ol>
            </nav>
            <section>Main content goes here</section>
            <footer>Footer things go here</footer>
            <!-- get YUI3 on the page, and a script block for your code -->
            <script src="http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js"></script>
            <script>
            YUI().use("node", function (Y) {
                // Your code goes here
                var allLi = Y.all("nav ol > li");
                // Now we should have a list to all the li
                allLi.each(function (li) {
                    var anchor = li.one("a");
                    // Write the li to the console
                    Y.log(li, "debug");
                    // Write our anchor element to console
                    Y.log(anchor, "debug");
                    if (anchor.get("href") === window.location.href) {
                        Y.log("Need to update the anchor", "debug");
                        li.setHTML('<span class="here">' + anchor.get('text') + '</span>');
                    }
                });
            });
            </script>
        </body>
    </html>
```

