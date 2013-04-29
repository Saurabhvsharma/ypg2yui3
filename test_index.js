/**
 * test_index.js - Test the web-view of Young Person's Guide to YUI3
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 * copyright (c) 2013 all rights of reserved
 * Released under the BSD 2-clause license, see http://opensource.org/licenses/BSD-2-Clause
 */

var YUI = require("yui").YUI,
    url = require("url"),
    port = process.env.PORT || 3334,
    hostname = process.env.HOSTNAME || "localhost";

YUI({
    debug: true,
    useSync: true
}).use("test", "io-base", function (Y) {
    var base_url = url.format({protocol: "http", hostname: hostname, port: port});
    Y.log("Start the web server for ypg2yui3 on port " + port, "info");
    setTimeout(function () {
        Y.log("Starting up tests environment for " + base_url, "info");
    }, 1000);
});
