module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'webapp/style/app.compiled.css': [
                        'src/scss/app.scss',
                        'bower_components/angular-material/angular-material.min.css'

                    ]
                }
            }
        },

        uglify: {
            app: {
                files: {
                    'webapp/js/app.min.js': ['webapp/js/dist-app.js']
                }
            }
        },

        concat: {
            vendor: {
                src: [
                    'bower_components/angular/angular.js',
                    'bower_components/angular-aria/angular-aria.js',
                    'bower_components/angular-animate/angular-animate.js',
                    'bower_components/angular-cookies/angular-cookies.js',
                    'bower_components/angular-material/angular-material.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/angular-messages/angular-messages.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',
                    'bower_components/angular-translate/angular-translate.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js'
                ],
                dest: 'webapp/js/vendor.js'
            },
            style: {
                src: [
                    'bower_components/angular-material/angular-material.min.css',
                    'webapp/style/app.compiled.css'
                ],
                dest: 'webapp/style/app.css'
            },
            app: {
                src: [
                    'webapp/js/vendor.js',
                    'webapp/js/templates.js',
                    'webapp/js/app.js'

                ],
                dest: 'webapp/js/dist-app.js'
            }
        },

        html2js: {
            main: {
                options: {
                    module: 'app.templates'
                },
                src: [ 'src/app/**/*.html' ],
                dest: 'webapp/js/templates.js'
            }
        },

        browserify: {
            dist: {
                files: {
                    'webapp/js/app.js': ['src/app/index.module.js']
                },
                options: {
                    transform: ['babelify', 'browserify-ngannotate']
                }
            }
        },

        copy: {
            common: {
                files: [
                    /* favicon */
                    {
                        src: 'src/favicon.ico', dest: 'webapp/favicon.ico', flatten: true
                    }
                ]
            }, i18n: {
                files: [
                    /* i18n */
                    {
                        cwd: 'src/i18n/', src: '**', dest: 'webapp/i18n/', expand: true
                    }
                ]
            },
            assets: {
                files: [
                    /* assets */
                    {
                        cwd: 'src/assets/', src: '**', dest: 'webapp/assets/', expand: true
                    }
                    ,
                    /* Google Material Design Icons */
                    {
                        cwd: 'bower_components/material-design-icons/iconfont', src: ['**', '!codepoints', '!material-icons.css', '!README.md'], dest: 'webapp/fonts/', expand: true
                    }
                    ,
                    /* favicon */
                    {
                        cwd: 'src/', src: ['favicon.cio'], dest: 'webapp/', expand: true
                    }
                    ,
                    /* manifest */
                    {
                        cwd: 'src/', src: ['manifest.json'], dest: 'webapp/', expand: true
                    },
                    {
                        cwd: 'src/', src: ['football.appcache'], dest: 'webapp/', expand: true
                    }

                ]
            },
            dev: {
                files: [
                    /* index-dev.html to index.html */
                    {
                        src: 'src/index-dev.html', dest: 'webapp/index.html',flatten: true
                    }
                ]
            },
            dist: {
                files: [
                    /* index-dist.html to index.html */
                    {
                        src: 'src/index-dist.html', dest: 'webapp/index.html',flatten: true
                    }
                ]
            }
        },

        clean: {
            style: [
                'webapp/style/app.compiled.css'
            ],
            app: [
                'webapp/**/*'
            ],
            js: [
                'webapp/js/*.js'
            ],
            dist: [
                'webapp/js/*.js',
                '!webapp/js/app.min.js'
            ]

        },

        'http-server': {

            'dev': {
                root: 'webapp/',
                port: 8282,


                showDir: true,
                autoIndex: true,
                ext: "html",
                runInBackground: false
            }
        },

        watch: {
            options: {
                event: ['changed', 'added', 'deleted']
            },
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['build-dev']
            },
            sass: {
                files: 'src/scss/**/*.scss',
                tasks: ['build-css']
            },
            app: {
                files: 'src/app/**/*.js',
                tasks: ['es6compile']
            },
            templates: {
                files: 'src/app/**/*.html',
                tasks: ['template']
            },
            assets: {
                files: ['src/assets/**/*'],
                tasks: ['copy:assets']
            },
            i18n: {
                files: ['src/i18n/**/*'],
                tasks: ['copy:i18n']
            },
            index: {
                files: 'src/*.html',
                tasks: ['copy:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-html2js');

    grunt.registerTask('template', ['html2js']);
    grunt.registerTask('es6compile', ['browserify']);
    grunt.registerTask('minimize-js', ['uglify:app']);

    grunt.registerTask('build-css', ['sass', 'concat:style', 'clean:style']);
    grunt.registerTask('build-js', ['es6compile', 'concat:vendor', 'template']);
    grunt.registerTask('build-assets', ['copy:common', 'copy:assets', 'copy:i18n']);

    grunt.registerTask('build-dev', ['build-css', 'build-js', 'build-assets', 'copy:dev']);
    grunt.registerTask('build-dist', ['build-css', 'build-js', 'concat:app', 'minimize-js', 'clean:dist', 'build-assets', 'copy:dist']);

    grunt.registerTask('release', ['clean:app', 'build-dist']);
    grunt.registerTask('development', ['build-dev', 'http-server', 'watch']);

    grunt.registerTask('default', ['development']);
};
