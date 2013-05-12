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
            },
            "/digital-clock-1.html": {
                filename: "digital-clock-1.md",
                data: {
                    content: ""
                }
            },
            "/digital-clock-2.html" : {
                filename: "digital-clock-2.md",
                data: {
                    content: ""
                }
            },  
            "/digital-clock-3.html": {
                filename: "digital-clock-3.md",
                data: {
                    content: ""
                }
            },
            "/digital-clock-4.html": {
                filename: "digital-clock-4.md",
                data: {
                    content: ""
                }
            },
            "/digital-clock.html": {
                filename: "digital-clock.md",
                data: {
                    content: ""
                }
            },
            "/what-happened.html": {
                filename: "what-happened.md",
                data: {
                    content: ""
                }

            },
            "/where-am-i.html": {
                filename: "where-am-i.md",
                data: {
                    content: ""
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
    Object.keys(book).forEach(function (page) {
        book[page].data.content = marked(fs.readFileSync("README.md").toString());
    });
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
