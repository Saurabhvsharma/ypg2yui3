/**
 * build.js - Build the web version and ePub of the longform article "Young Person's Guide to YUI3"
 */

require("shelljs/global");

function clean() {
    rm("-fR", "htdocs/*");
}

function buildAll() {
    // htdocs/index.html: Young-Persons-Guide-to-YUI3.md
    mkdir("-p", "htdocs/css");
    cp("-f", "templates/css/*", "htdocs/css/");
    
    if (exec("mweave Young-Persons-Guide-to-YUI3.md -t templates/page.html -d htdocs -o index.html").code !== 0) {
      echo("Problem building htdocs/index.html");
    }
    
    // htdocs/where-am-i.html: where-am-i.md
    if (exec("mweave where-am-i.md -d htdocs -o where-am-i.html -t templates/page.html").code !== 0) {
        echo("Problem building where-am-i-md");
    }
    
    //htdocs/what-happened.html: what-happened.md
    if (exec("mweave what-happened.md -d htdocs -o what-happened.html -t templates/page.html").code !== 0) {
        echo("Problem building what-happened.md");
    }
    
    // htdocs/clock-1.html: clock-1.md
    if (exec("mweave clock-1.md -d htdocs -o clock-1.html -t templates/page.html").code !== 0) {
        echo("Problem building digit-clock-1.md");
    }
    
    //htdocs/clock-2.html: clock-2.md
    if (exec("mweave clock-2.md -d htdocs -o clock-2.html -t templates/page.html").code !== 0) {
        echo("Problem building clock-2.md");
    }
    
    //htdocs/clock-3.html: clock-3.md
    if (exec("mweave clock-3.md -d htdocs -o clock-3.html -t templates/page.html").code !== 0) {
        echo("Problem building clock-3.md");
    }
    
    //htdocs/clock-4.html: clock-4.md
    if (exec("mweave clock-4.md -d htdocs -o clock-4.html -t templates/page.html").code !== 0) {
        echo("Problem building clock-4.md");
    }
}

if (process.argv.length > 2 && process.argv[3].toLowerCase() === "clean") {
    clean();
} else {
    buildAll();
}
