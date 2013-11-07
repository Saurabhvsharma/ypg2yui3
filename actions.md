
## Actions

_YUI3_ provides a robust event system which includes listening for mouse, 
key and touch events. Unlike other JavaScript frameworks _YUI3_ approaches 
the development problem wholistically and doesn't create a separate 
library for touch devices (e.g. phones and tablets). Instead your code can 
work across all devices. _YUI3_ loader also makes it efficient and how 
much code you download to the device. To add support for touch guesters, 
mouse interaction and the like I am introducing another module called 
[event][].  It will let us _listen_ for interesting things on the _DOM_.  
[event]: http://yuilibrary.com/yui/docs/event/ "The Event modules provide 
access clicks, touch, touch guestures and keypress"


### Mouse clicks, keyboard commands and touch

Interaction with the elements in the page by a mouse, keyboard or touch 
triggers an event. If you are listening for an event then you can get an 
event object.  This is like the normal DOM events exposed in JavaScript or 
in libraries like _jQuery_. You can choose to handle the event, alter the 
propogation and stop listening to it. The key is to get a handle to the 
object and then use the _on()_ method to setup a callback to use when the 
event happens.

### Exercises

#### What happened?

- Programming goal
    - Display a button and monitor for click and flick events
- Learning objectives
    - Learn how to include the event module
    - Learn how to a listeners on elements

This is another example of showing making more sense than telling but 
let me quickly outline the steps you normally take to get started.

1. Load _YUI3_ in the page
2. In your _script_ element (or JavaScript file pointed at the _script_ element) include the _event_ module.
3. In your _Y_ function select the object you want to listen to (e.g. a button) then use _on()_ to add behavior.

That is the basic approach. In this example let us create a simple webpage 
with a button in the middle and a status line in the footer.  When we pick 
up an event listened for then update the status line (e.g. mouse key 
pressed if a your clicks on the button). This is example let's listen for 
clicks and flick guesture.

##### Steps

Copy _seed-file.html_ to _what-happened.html_. Do the following things

1. Add a _button_ element to the _section_ element in our HTML markup
2. Update the line where we _use()_ _YUI_ and generate our _Y_ function to to include the _event_ module.
3. Select our button using _Y.one()_
4. Add listeners via _on()_ method for click and flick

##### Notes

* It is important to remember that event listeners do have an overhead
	* if you don't need it anymore then remove the listener.
* One approach to the solution is [what-happened.html](what-happened.html)


