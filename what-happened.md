
#### What happened?

This is another example of showing making more sense than telling but let me quickly outline the
steps you normally take to get started.

1. Load _YUI3_ in the page
2. In your Script blog (or JavaScript file using _YUI3_) include the _event_ module.
3. In your _Y_ function select the object you want to listen to (e.g. a button) then use _on()_ to add behavior.

That is the basic approach. In this example let us create a simple webpage with a button in the middle and
a status line in the footer.  When we pick up an event listened for then update the status line (e.g. mouse
key pressed if a your clicks on the button). This is example let's listen for mouse clicks and touch guestures.

#### Steps

Copy _seed-file.html_ to _what-happened.html_. Do the following things

1. Add a _button_ element to the _section_ element in our HTML markup
2. Update the line where we _use()_ _YUI_ and generate our _Y_ function to to include the _event_ module.
3. Select our button using _Y.one()_
4. Add listeners via _on()_ method for mouse click, touch and swipe

