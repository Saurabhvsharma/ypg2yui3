## Exercise Digital Clock SPA

- Programming goal
    + build a simple single page webapp using _YUI3_ digital clock in the webpage
        - support both a analog and digital display (hint: leverage CSS)
        - support alarms save as a JSON file (e.g. a public Dropbox URL)
        - alarms should pop up an alert or notification if that is supported
- Learning objective 
    + Apply what we have covered in this tutorial

### Steps

Copy _seed-file.html_ to _clock.html_.  Copy _digital-clock-2.js_ to
_clock.js_ (i.e. this will be our final version of a YUI module called
digital clock). Do the following things--

1. Add four handlebar templates as _script_ elements.
    - digital clock face
    - analog clock face
    - alarm list
    - next alarm
2. Modify _clock.js_ to take a template instead of a custom render method
    - change the namespace from "digital-clock" to "clock"
3. Add support to our _DigitalClock_ object to keep a list of alarms by day of week
4. ...
10. Make a external CSS file called _clock.css_ that will provide both a analog and digital view of the time

### Solution

First here is a possible HTML rendering.

[clock.html](clock.html)
```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Clock</title>
            <link rel="stylesheet" href="clock.css" media="all">
        </head>
        <body>
        </body>
    </html>
```

Now let us look at the module definition.

[clock.js](clock.js)
```JavaScript
```

Finally here is the CSS used for this SPA.

[clock.css](clock.css)
```CSS
```
