YUI().use("node", function (Y) {
    "use strict";
    var title = Y.one("title"),
        h1 = Y.one("h1");

    title.setHTML("Hello World - improved.");
    h1.setHTML("Yippee! I can be more efficient.");
});