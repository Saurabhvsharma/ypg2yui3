
## Templates

### Building a page with **Y.Handlebars**

Templates are a convient solution to generating HTML from JavaScript 
functions.  Templates in JavaScript can often be rendered server side as 
well as in the browser. This is true of _Handlbars_ templates.  
_Handlebars_ is an extention to a popular template notation called 
_Mustache_.  The basic idea is your surround the parts of the markup you 
want to replace with double curly brackets surrounding matching variable 
name.  When you provide the template function with an object that contains 
attributes that match those curly bracket variable names then the template 
engine replaces the content.  Here's a quick example of a template--


```HTML
    <div><span id="name">{{name}}</span> <span id="phonenumber">{{phonenumber}}</span></div>
```

Here is a JSON object that could be used to populate the template--

```JavaScript
    {"name": "John Doe", "phonenumber": "+1-222-333-4444"}
```

If you applied that object to that template you'd get something like

```HTML
    <div><span id="name">John Doe</span> <span id="phonenumber">+1-222-333-4444</span></div>    
```

In the past it was common to see code that look like this to generate the 
same HTML fragment from JavaScript--

```JavaScript
    record = {"name": "John Doe", "phonenumber": "+1-222-333-4444"},
    html = '<div><span id="name">' + record.name + '</span> <span id="phonenumber">' +
        record.phonenumber + '</span></div>;    
```

It is not too bad but when you get lots of fields (e.g. a person's profile,
a calendar event listing) you get lots of concatenation operations. That 
isn't terribly effecient for JavaScript and if you miss a closing 
quotation can be tough to debug. Templates provide a clean effective way 
to avoid that.

#### Embedding your handlebars template

The easiest place to embed your template is in the HTML file that needs 
them.  A practice of using a _script_ element has been evolving as a way 
of designating the template within the page. Building on our previous 
example here is a simple webpage that displays a list of names and phone 
numbers embedded in a _ul_ element.  We load _YUI_ normally but include 
_handlebars_ as a module.  We fetch the templates using _Y.one()_ by CSS 
id. We compile the template and then apply our data object the HTML 
element we want to update.  While our example has one template in 
principle you can do this as many times as you needed for the page's 
content.  With slight modification in approach you could pre-render this 
server side for a pregressively enhanced experience.

[handlebars-demo-1.html](handlebars-demo-1.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Handlebars Demo 1</title>
        </head>
        <body>
            <header>Handlebars Demo 1</header>
            <section>Main content goes here</section>
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
            <script type="text/javascript" rel="javascript">
                var data = [
                    {name: "Jane Doe", phonenumber: "+1-222-333-4567"},
                    {name: "John Doe", phonenumber: "+1-222-333-5678"},
                    {name: "Trina Doe", phonenumber: "+1-222-333-6789"}
                ];
            </script>
            <!-- get YUI3 on the page, and a script element for your code -->
            <script src="http://yui.yahooapis.com/3.13.0/build/yui/yui-min.js"></script>
            <script>
            YUI().use("node", "handlebars", function (Y) {
                // Your code goes here
                var source = Y.one("#list-template").getHTML(),
                    template = Y.Handlebars.compile(source),
                    section = Y.one("section");
                
                section.setHTML(template({data: data}));
            });
            </script>
        </body>
    </html>
```

Of course you could also define your templates outside the document and 
bring them in via an [xdr][] call.


[xdr]: http://docs.webplatform.org/wiki/apis/xhr "xdr - Cross Domain Request, also referred to as Ajax."

### Exercises

#### Clock with Template

- Programming Goal
    + Re-factor our Clock _YUI_ module to use templates rather than a custom render method.
- Learning Objective
    + Become with familiar with the basics of _Handlebars_ as implemented in _YUI_

##### Steps

##### Notes

* One implementation is [clock-3.html](clock-3.html)

