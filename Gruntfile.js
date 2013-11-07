/**
 * Build Young Person's Guide to YUI3 by R. S. Doiel, <rsdoiel@yahoo.com>
 */
/*jslint node: true, indent: 4 */
var shell = require("shelljs");

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jslint: {
            server: {
                src: ["Gruntfile.js"],
                directives: {
                    node: true,
                    todo: true
                },
                options: {
                    errorsOnly: false,
                    failOnError: false
                }
            },
            client: {
                src: [ 'www/*.js' ],
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
                cmd: "rm -fR www/*",
                stderr: true,
                stdout: true,
                exitCode: 0
            },
            mweave: {
                cmd: function () {
                    var mdFilenames;

                    function mw(inFilename, outFilename) {
                        return ["node node_modules/mweave/cli.js",
                            inFilename,
                            "-t templates/page.hbs",
                            "-d www",
                            "-o", outFilename].join(" ");
                    }

                    grunt.log.writeln("Copying templates/css to www/css");
                    shell.mkdir("-p", "www/css");
                    shell.cp("-f", "templates/css/*", "www/css/");

                    // Find the markdown files
                    mdFilenames = shell.ls('./').filter(function (filename) {
                        return filename.match(/\.md$/);
                    });
                    grunt.log.writeln(mdFilenames);
                    mdFilenames.forEach(function (filename) {
                        var htmlFilename = filename.replace(/\.md$/, '.html');
                        grunt.log.writeln(htmlFilename + ' <-- ' + filename);
                        if (shell.exec(mw(filename, htmlFilename)).code !== 0) {
                            grunt.fail.warn("Problem building " + htmlFilename);
                        }
                    });
                    return "";
                }
            }
        },
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['templates/css/*.css', "www/*.css"]
            },
            lax: {
                options: {
                    import: false
                },
                src: ["www/css/*.css"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-csslint');

    grunt.registerTask('test', ['exec:mweave', 'jslint', 'csslint']);
    grunt.registerTask('default', ['exec:clean', 'exec:mweave', 'jslint', 'csslint']);
};
