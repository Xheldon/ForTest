// Generated on 2016-01-22 using
// generator-webapp 1.1.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['<%= config.app %>/css/{,*/}*.{scss,sass}'],
                tasks: ['sass', 'postcss','cssmin:app']
            },
            css: {
                files: ['<%= config.app %>/css/{,*/}*.css']
                //tasks: ['postcss']
            },
            js: {
                files: ['<%= config.app %>/js/{,*/}*.js']
            }
        },

        browserSync: {
            options: {
                notify: false,
                background: true,
                watchOptions: {
                    ignored: ''
                }
            },
            livereload: {
                options: {
                    files: [
                        '<%= config.app %>/{,*/}*.html',
                        '<%= config.app %>/img/{,*/}*',
                        '<%= config.app %>/css/{,*/}*.css',
                        '<%= config.app %>/js/{,*/}*.js'
                    ],
                    port: 9000,
                    server: {
                        baseDir: ['.tmp', config.app],
                        routes: {
                            '/bower_components': './bower_components'
                        }
                    }
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        eslint: {
            target: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js',
                '!<%= config.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            options: {
                sourceMap: true,
                sourceMapEmbed: true,
                sourceMapContents: true,
                includePaths: ['.']
            },
            src: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/css/scss',
                    src: ['*.{scss,sass}'],
                    dest: '<%= config.app %>/css/scss',
                    ext: '.css'
                }]
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    // Add vendor prefixed styles
                    require('autoprefixer')({
                        browsers: ['> 1%', 'last 4 versions', 'ie 6-8', 'Firefox ESR']
                    })
                ]
            },
            source: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/css/scss',
                    src: '{,*/}*.css',
                    dest: '<%= config.app %>/css',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            app: {
                files: {
                    '<%= config.app %>/css/css.min.css':'<%= config.app %>/css/*.css'
                }
            }
        },
        uglify: {
            app: {
                files: {
                    '<%= config.app %>/js/app.min.js':'<%= config.app %>/js/*.js'
                    //这命令用来压缩线上的js,需要压哪个文件就放到js目录下面即可
                    //'<%= config.app %>/js/user1.0.min.js':'<%= config.app %>/js/user1.0.js'
                }
            }
        },
        // Automatically inject Bower components into the HTML file
        wiredep: {
            app: {
                src: ['<%= config.app %>/index.html'],
                ignorePath: /^(\.\.\/)*\.\./
            },
            sass: {
                src: ['<%= config.app %>/css/{,*/}*.{scss,sass}'],
                ignorePath: /^(\.\.\/)+/
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= config.dist %>/scripts/{,*/}*.js',
                    '<%= config.dist %>/styles/{,*/}*.css',
                    '<%= config.dist %>/images/{,*/}*.*',
                    '<%= config.dist %>/fonts/{,*/}*.*',
                    '<%= config.dist %>/*.{ico,png}'
                ]
            }
        },
        // Copies remaining files to places other tasks can use
        copy: {
            styles: {
                src: '<%= config.app %>/css/{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'sass'
            ]
        }
    });


    grunt.registerTask('serve', 'start the server and preview your app', function (target) {

        if (target === 'dist') {
            return grunt.task.run(['build', 'browserSync:dist']);
        }

        grunt.task.run([
            'clean:server',
            'wiredep',
            'concurrent:server',
            'sass',
            'postcss:source',
            'cssmin:app',
            'uglify:app',
            'browserSync:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', function (target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'postcss'
            ]);
        }

        grunt.task.run([
            'browserSync:test',
            'mocha'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'postcss',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:eslint',
        'test',
        'build'
    ]);
};
