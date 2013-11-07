
## Remote

### Bring content into the page with **Y.io** from **io-base**

Sometimes we need data from other websites or even an [API][] in our 
hosting website. It is nice to have that option in the browser and _YUI_ 
has a module for that :-).  The module is called _IO_ or more specifically 
in your _Y_ function _Y.io_. It abstracts content input and output. That 
means it can be used to load other content (e.g. RSS, XML, HTML, JSON) as 
well as used to push data to a server (e.g. a forms' POST, PUT, GET or 
DELETE).  It is what puts connectivity in the phrase "social web app". 
I.e. the social services are usually someplace else on the network (e.g. 
Twitter, Facebook, G+). Since this tutorial in focused on introducing the 
browser side resources of _YUI_ I am going to show you how you might 
retrieve a remote [JSON][] file to populate our previous example of phone 
number list.  In principle you use the same techniques to talk to an API.  
In this example a list of names and phone numbers is stored in a file 
called _phonelist.json_ on our web server. Using _Y.io_ we get the file 
and convert to an JavaScript object. Next the object is used along with a 
template like our earlier example.


Here is our phone list data. For the purpose of this tutorial we can think 
of it as an web service _API_ call.

[phonelist.json](phonelist.json)
```JavaScript
    [
        {"name": "Jane Doe", "phonenumber": "+1-222-333-4567"},
        {"name": "John Doe", "phonenumber": "+1-222-333-5678"},
        {"name": "Trina Doe", "phonenumber": "+1-222-333-6789"}
    ]
```

Here is what our HTML with in-line JavaScript would look like.

[phonelist.html](phonelist.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Phone List</title>
        </head>
        <body>
            <header>Phone List</header>
            <section>Phone list content goes here</section>
            <footer></footer>
            <!-- Define a template to render our UL list with -->
            <script id="list-template" type="text/x-handlebars-template">
                <ul>
                {{#data}}
                    <li><span class="name">{{name}}</span> <span class="phonenumber">{{phonenumber}}</span></li>
                {{/data}}
                </ul>
            </script>
            <!-- Define some data to put in the template -->
            <!-- get YUI3 on the page, and a script element for your code -->
            <script src="http://yui.yahooapis.com/3.13.0/build/yui/yui-min.js"></script>
            <script>
            // Notice we have added "io-base" to our list of modules in our "use" function.
            YUI().use("node", "handlebars", "io-base", function (Y) {
                // Your code goes here
                var source = Y.one("#list-template").getHTML(),
                    template = Y.Handlebars.compile(source),
                    section = Y.one("section");
                
                // Here are two function, one to execute on a successful data retrieval
                // the other if something goes wrong.
                function onSuccess(id, response, extra_args) {
                    var data = JSON.parse(response.responseText);

                    // Here is our render method from before.
                    section.setHTML(template({data: data}));
                }

                function onFailure(id, response, extra_args) {
                     // If this doesn't work we should say something.
                     section.setHTML("<em>ERROR</em>: cannot get the phone list at this time.");
                }

                // Since the data is not yet available we use YUI to fetch it then we can
                // use the emplate to render it into "section" as before.
                Y.io("phonelist.json", {
                    on: {
                        // We listen for an "io" success event.
                        success: onSuccess,
                        // We listen for an "io" failure event.
                        failure: onFailure
                    }
                });
            });
            </script>
        </body>
    </html>
```

Notice we still use our 

```JavaScript
    section.setHTML(template({data: data}));
```

We only wait to call it until we have data base in the _onSuccess()_ 
callback.  The first parameter _Y.io_ expects is a URL as a string.  
This could be a relative path  or a full URL to an API.  There are 
additional optional parameters in the _Y.io_ function call.  The second 
one is for a configuration object. Typically we define our success and 
failure callbacks here.  If we were interacting with an API, say 
"POST-ing" a form's content, we would provide additional configuration.

There are additional events emmited by _Y.io_ which can be listened for.
To see a complete list go to the [YUI Library](http://yuilibrary.com/yui/)
documentation and [Utilities](http://yuilibrary.com/yui/utilities) and
[IO Utility](http://yuilibrary.com/yui/docs/io/). Additional you will 
find Object specific docs extracted from the source code at [YUI Library,
API Docs, IO](http://yuilibrary.com/yui/docs/api/classes/IO.html) for 
specific implementation details.


### An aside about IO

_IO_'s _Y.io_ is a very configurable and flexible object. I have shown 
only one idiomatic use to keep things simple. If all you were doing in 
your page was fetching _JSON_ objects then you could use _Y.io_'s
_getJSON()_ function. This makes it even simplier. I have chosen to show 
you this idomatic implementation because you can extend it to do things 
like submitting POSTs to a API allowing you to do a complete [SPA][].

_IO_'s (i.e. _io-base_ in our use module list) is one of my favorite 
modules.  It works both in the browser and in _Node_. That gives us a 
common way to setup remote API access that might be processed in a middle 
layer running on the server or directly in the client web browser.

[API]: http://wikipedia.org/wiki/API "Application Programming Interface - For our purposes today a way to get data from and push data to a web service"
[JSON]: http://json.org "JavaScript-Object-Notation, a text format for easy data exchange"
[SPA]: http://en.wikipedia.org/wiki/Single_page_application "Single-Page Application"


### Exercises

#### Clock with alarms

##### Steps

##### Notes

* One implementation of our Clock with Alarms pull is [clock-4.html](clock-4.html)


