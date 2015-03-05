module.exports = function (grunt) {

    "use strict";

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {
            css: {
                files: ['assets/scss/**/*.scss'],
                tasks: ['sass','autoprefixer']
            },

            options: {
                spawn: false
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            main: ['shell:npm', 'main']
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'assets/css/style.css',
                        'assets/js/build.js'
                    ]
                },
                options: {
                    watchTask: true,
                    ghostMode: false,
                    proxy: 'http://localhost:3000'
                }
            }
        },

        shell: {
            npm: {
                command: "npm start"
            }
        },

        sass: {
            dist: {
                options: {
                    sourceMap: true,
                    outputStyle: 'compressed'
                },
                files: {
                    'assets/css/style.css': 'assets/scss/style.scss'
                }
            }
        },

        autoprefixer: {
            single_file: {
                options: {
                    browsers: ['last 4 version', 'ie 9'],
                    map: true
                },
                src: 'assets/css/style.css'
            }
        }

    });

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-concurrent');

    // Default task(s).
    grunt.registerTask('style', ['sass', 'autoprefixer']);
    grunt.registerTask('main', ['browserSync', 'watch']);
    grunt.registerTask('default', ['concurrent']);

};