/**
 * index.js - A webserver view of a Young Person's Guide to YUI3
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 * copyright (c) 2013
 * Released under the BSD 2-clause license, see http://opensource.org/licenses/BSD-2-Clause
 */

var YUI = require("yui").YUI,
    fs = require("fs"),
    path = require("path"),
    url = require("url"),
    http = require("http"),
    marked = require("marked"),
    port = process.env.PORT || 3334
    hostname = process.env.HOSTNAME || "localhost";

YUI({
    debug: true,
    useSync: true
}).use("handlebars", function (Y) {
    var book = {
            "/": {
                filename: "README.md",
                data: {
                    title: "Young Person's Guide to YUI3",
                    content: "",
                    javascript: ""
                }
            }
        },
        source = fs.readFileSync("templates/page.html").toString(),
        template = Y.Handlebars.compile(source);

    Y.log("Adding README.md to /", "info");
    marked.setOptions({
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: true,
          smartLists: true,
          langPrefix: 'language-',
          highlight: function(code, lang) {
              if (lang === 'js') {
                  return highlighter.javascript(code);
              }
              return code;
          }
    });
    book["/"].data.content = marked(fs.readFileSync("README.md").toString());
    http.createServer(function (request, response) {
        var parts = url.parse(request.url, true),
            page;

        if (book[parts.pathname] !== undefined) {
            page = template(book[parts.pathname].data);
            response.writeHead(200, 
                {"Content-Type": "text/html"});
            response.end(page, "utf8");
        } else {
            response.end("Ooops: " + JSON.stringify(parts));
        }
    }).listen(port, hostname);
    Y.log("listening at " + url.format({protocol: "http", hostname: hostname, port: port}));
});
