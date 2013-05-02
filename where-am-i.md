
This first block gets the selectors we want to work with.  _Y.all()_ will produce a list of anchor elements
found on the page. The _Y.one()_ selects a single div element (i.e. div.results). We now have parts of the
page to work with.

**all_anchors** is a list and YUI3 provides a nice method called _each()_ that makes it trivial to iterate
of the parts of that list.  It is similar though not identical to the JavaScript Array method _forEach()_
or jQuery's list method _each()_. Let us look at the _each()_ method in this example.

```JavaScript
    all_anchors.each(function (anchor) {
        results.push(anchor.get("href"));
    });
```

In this example we get each _href_ from each _anchor_ and add it (i.e. _push()_) to the _results_ array.
If there had been a _title_ attribute we wanted to list we could use _anchor.get("title")_ to retrieve its
value.

Finally we set the contents of the _div.results_ tag with _setHTML()_.  _setHTML()_ allows you to inject
HTML elements via a String into the page.  It doesn't escape the angle brackets in the markup.  If you
want to escape the string you're inserting into the page then use _set("text", value)_ where _value_
is the string you want to escape and insert into the page. This will make more sense if we show it.
Modify _selecting-all.html_'s script block to use _div.results.set("text", ...)_

```JavaScript
            <script>
                YUI().use("node", function (Y) {
                    var all_anchors = Y.all("a"),
                        div_results = Y.one("#results"),
                        results = [];

                        all_anchors.each(function (anchor) {
                            // Grab the href from each anchor element and save it
                            // in the results.
                            results.push(anchor.get("href"));
                        });
                        // Now display the resultsin div.results as plain, escaped text
                        div_results.set("text", "The following links were found <em>" + results.join(", ") + "</em>");
                });
            </script>
```

Now when you display the page you should see _<em>_ and _</em>_ as part of the script.

