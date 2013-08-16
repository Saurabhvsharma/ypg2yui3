/**
 * Build Young Person's Guide to YUI3 by R. S. Doiel, <rsdoiel@yahoo.com>
 */
/*jslint node: true, indent: 4 */
"use strict";
var shell = require("shelljs");

module.exports = function(grunt) {
    "use strict";
   
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jslint: {
            server: {
                src: ["Gruntfile.js"],
                directives:  {
                    node: true,
                    todo: true
                },
                options: {
                    errorsOnly: false,
                    failOnError: false
                }
            },
            client:  {
                src: [ 'htdocs/*.js' ],
                directives: {
                    browser: true,
                    predef: [
                        'YUI'
                    ]
                }
            }
        },
        exec: {
            clean: {
                cmd: "rm -fR htdocs/*",
                stderr: true,
                stdout: true,
                exitCode: 0
            },
            mweave: {
                cmd: function () {
                    function mw(inFilename, outFilename) {
                        return ["node node_modules/mweave/cli.js",
                            inFilename,
                            "-t templates/page.html",
                            "-d htdocs",
                            "-o", outFilename].join(" ");
                    };

                    grunt.log.writeln("Copying templates/css to htdocs/css");
                    shell.mkdir("-p", "htdocs/css");
                    shell.cp("-f", "templates/css/*", "htdocs/css/");

                    grunt.log.writeln("htdocs/index.html <-- Young-Persons-Guide-to-YUI3.md");
                    if (shell.exec(mw("Young-Persons-Guide-to-YUI3.md", "index.html")).code !== 0) {
                        grunt.fail.warn("Problem building htdocs/index.html");
                    }
    
                    grunt.log.writeln("htdocs/where-am-i.html <-- where-am-id.md");
                    if (shell.exec(mw("where-am-i.md", "where-am-i.html")).code !== 0) {
                        grunt.fail.warn("Problem building where-am-i-md");
                    }
    
                    grunt.log.writeln("htdocs/what-happened.html <-- what-happened.md");
                    if (shell.exec(mw("what-happened.md", "what-happened.html")).code !== 0) {
                        grunt.fail.warn("Problem building what-happened.md");
                    }
    
                    grunt.log.writeln("htdocs/clock-1.html <-- clock-1.md");
                    if (shell.exec(mw("clock-1.md", "clock-1.html")).code !== 0) {
                        grunt.fail.warn("Problem building digit-clock-1.md");
                    }
    
                    grunt.log.writeln("htdocs/clock-2.html <-- clock-2.md");
                    if (shell.exec(mw("clock-2.md", "clock-2.html")).code !== 0) {
                        grunt.fail.warn("Problem building clock-2.md");
                    }
    
                    grunt.log.writeln("htdocs/clock-3.html <-- clock-3.md");
                    if (shell.exec(mw("clock-3.md", "clock-3.html")).code !== 0) {
                        grunt.fail.warn("Problem building clock-3.md");
                    }
    
                    grunt.log.writeln("htdocs/clock-4.html <-- clock-4.md");
                    if (shell.exec(mw("clock-4.md", "clock-4.html")).code !== 0) {
                        grunt.fail.warn("Problem building clock-4.md");
                    }
                    return "";
                }
            }
        },
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['templates/css/*.css', "htdocs/*.css"]
            },
            lax: {
                options: {
                    import: false
                },
                src: ["htdocs/css/*.css"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-csslint');

    grunt.registerTask('test', ['exec:mweave', 'jslint', 'csslint']);
    grunt.registerTask('default', ['exec:clean', 'exec:mweave', 'jslint', 'csslint']);
};
