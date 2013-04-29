/**
 * index.js - A webserver view of a Young Person's Guide to YUI3
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 * copyright (c) 2013
 * Released under the BSD 2-clause license, see http://opensource.org/licenses/BSD-2-Clause
 */

var YUI = require("yui").YUI,
    express = require("express"),
    app = express();

YUI({
    debug: true,
    useSync: true
}).use("io-base", "handlebars", function (Y) {
});
