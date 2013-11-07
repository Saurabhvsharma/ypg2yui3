
## Modules

### Beyond **node** and **event**

The concept of modules is important in _YUI_. I would go so far as to say 
it defines the nature of _YUI_.  _YUI_ strength and longevity has been 
its flexibility in loading modules either via _script_ elements, dynamic 
loading or rollups. What people are using _RequireJS_, _AMD_ for today 
_YUI_ has had for years. Unlike many other browser module loaders _YUI_'s
approach works both in the browser and server side in _Node_. 


Why modules? It allows for effective code re-use.  It allows you to tailor 
what code is delivered to the browser and when it should be delivered to 
the browser.  If you have functionality that is only needed at certain 
times (e.g. when someone is logged in or is using an old version of a 
browser) modules help you do that. Modules also support versioning and
allow for multiple instancies with different versions.  You can even 
include other non-YUI libraries (e.g. jQuery) via _YUI_'s module and 
loader system.


What is a YUI module? It is JavaScript wrapped in _YUI().add()_. That is 
all it is. It can be more than that (e.g. you can add version info, 
namespacing, dependency information) but at its simplest form it is what 
you attach to _Y_ via _add()_.

```JavaScript
    // Here we define a module called Hello World
    YUI.add("hello-world", function (Y) {
        Y.namespace("hello-world");
        Y.helloWorld = "Hello World!";
    });

    // Here we use a module called Hello World
    YUI().use("hello-world", function (Y) {
        // We can display Hello World message in the p element
        Y.one("p").set("text", Y.helloWorld);
    });
```

We can also put our module in a separate file (e.g. _hello-world.js_).

[hello-world.js](hello-world.js)
```JavaScript
    // Here we define a module called Hello World
    YUI.add("hello-world", function (Y) {
        "use strict";
        Y.namespace("hello-world");
        Y.helloWorld = "Hello World!";
    });
```

We can re-use that module by including it in a _script_ element before our
_use()_ script element.

[hello-world.html](hello-world.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head><title>Hello World</title></head>
        <body>
            <p>Our message goes here</p>
            <!-- Include YUI -->
            <script src="http://yui.yahooapis.com/3.13.0/build/yui/yui-min.js"></script>
            <!-- Include our module -->
            <script src="hello-world.js"></script>
            <!-- Now use our module -->
            <script>
            // Now we're ready to 'use' our Hello World and the YUI node module.
            YUI().use("node", "hello-world", function (Y) {
                // We can display Hello World message in the p element
                Y.one("p").set("text", Y.helloWorld);
            });
            </script>
        </body>
    </html>
```

If we don't want to use an extra _script_ element then we can tell 
_YUI_ where to find our module with a little bit of [configuration][].


[hello-world-2.html](hello-world-2.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head><title>Hello World</title></head>
        <body>
            <p>Our message goes here</p>
            <!-- Include YUI -->
            <script src="http://yui.yahooapis.com/3.13.0/build/yui/yui-min.js"></script>
            <!-- Include our module via configuration -->
            <script>
            // Tell YUI where to find our module, then "use" it.
            YUI({
                modules: {
                    "hello-world": {
                        fullpath: "hello-world.js"
                    }
                }
            }).use("node", "hello-world", function (Y) {
                // We can display Hello World message in the p element
                Y.one("p").set("text", Y.helloWorld);
            });
            </script>
        </body>
    </html>
```



[configuration]: http://yuilibrary.com/yui/docs/yui/#loading-modules "YUI is extremely flexible in how you load modules."
[namespaced]: http://yuilibrary.com/yui/docs/api/classes/YUI.html#method_namespace "Namespaces let us use versions and other modules without name collisions"

Take away points

* Modules help encourage code re-use
* Modules can be referenced locally via a _script_ element
* Modules can be dynamically (synchronously or asynchronously) loaded
* Modules can be local to your web server and that location can be defined through configuration
* Modules can be also submitted to _YUI_'s gallery and be hosted in Yahoo's CDN

Like DOM events working with modues is easier shown.

### A quick aside on YUI Gallery

_YUI_ supports a whole [gallery][] of user contributed modules. Some 
specialized and some general purpose. The good thing is that you only 
load them if you need them.  You can specify a specific version of a 
module if you like. Before something becomes part of _YUI3 core_ it is 
first additioned as a gallery module.  If it is considered essential then 
it may become part of the core distribution of YUI.  Additionally YUI has 
been going on a diet of late.  Features that have less utility have 
migrated out of core back into the gallery.  This allows YUI to trim the 
size of its core while continuing to support the functionality it had 
previously in core. Being in the gallery versus being in core is not a 
statement on the quality or importance of the code. Being in the gallery 
means your code could be included on Yahoo's CDN which simplifies using it 
for others. 

[gallery]: http://yuilibrary.com/gallery/ "Gallery modules are linked from yuilibrary, many are available on Yahoo's CDN, but the source is often on github.com"

### Exercises

#### What Time is it?

- Programming Goal
    + Create a simple _YUI_ module out of our clock
- Learning Objectives
    + Increase understanding on how to load modules
    + Illustrate the a simple case of creating a module
    + Explore loading a module based on configuration

Let us turn our "clock" into a module. The idea is to create 
an Object attached to your _Y_ called _DigitalClock_ you could then add
that to a _DOM_ element.  It should also support an optional callback
function to supported extending the module with a custom render function.
This will allow your flexibility to extend the clock later
(e.g. displaying as an analog clock using Canvas).

##### Steps

Create a new file called _clock-2.js_. We will put our module code there.
Copy _seed-file.html_ to _clock-2.html_. Do the following things

1. In _clock-2.html's _script_ in-line element add configuration to point to our module.
2. In _clock-2.html's _script_ in-line element update the _use()_ function to include our module.
3. Open our empty _clock-2.js_ file and 
    a. create our module
    b. create a namespace
    c. create a _render()_ method that returns HTML markup as a string of our clock's current time
        - this should expect a _Date_ object as a parameter to be rendered.
    d. create a _run()_ method that uses setInterval to update our clock every second. 
        - first paramter is a CSS selector of an element which will hold our clock
        - An optional second parameter should allow for a custom render method
        - If a render method is not provided use our default _render()_ we implemented.
4. Go back to our _clock-2.html_ file.
5. Inside the _Y_ on our in-line _script_ element use _Y.DigitalClock.render()_ to run our clock.

##### Notes

* We are using an external file for some of our JavaScript this time (i.e. our module)
* One possible solition is [clock-2.html](clock-2.html) and [clock-2.js](clock-2.js) holding our module code.


