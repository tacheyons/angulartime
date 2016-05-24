module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['public/js/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },



  connect: {
    example: {
      port: 3000,
      base: 'public'
    },
    meta: {
      port: 1338,
      base: 'tasks'
    },
    combined: {
      port: 1339,
      combine: [
        'example',
        'tasks'
      ]
  }
},
 

 // Test settings
        karma: {
            options: {
                configFile: 'test/karma.conf.js'
            },
            unit: {
                singleRun: true
            },
            dist: {
                options: {
                    files: [
                        '<%= yeoman.dist %>/js/nxn-lib.js',
                        '<%= yeoman.app %>/third_party/lib/angular-mocks/angular-mocks.js',
                        '<%= yeoman.dist %>/js/nxn-lib-internal.js',
                        '<%= yeoman.dist %>/js/nxn-app.js',
                        '<%= yeoman.app %>/partials/**/*.html',
                        'test/spec/**/*.js'
                    ]
                },
                singleRun: true
            }
        },

 
/*
     regex_extract: {
        default_options: {
            options: {
                regex : "<div(.*|\n*)>(\s*|\n*)<\/div>"
            },
            files: {
                'dist/xls/index.xls': ['public/index.html']
            }
        }
    }, */
   protractor: {
    options: {
      configFile: "./test/protractor.conf.all.platforms.js", // Default config file 
      keepAlive: true, // If false, the grunt process stops when the test fails. 
      noColor: false, // If true, protractor will not use colors in its output. 
      args: {
                    baseUrl: 'http://' + (grunt.option('connectHost') || 'localhost') + ':' + (3000 || 0) + '/',
                    specs: ['./test/e2e/finance/*.spec.js']
                }
    },
     all: {
             options: {
                 configFile: "./test/protractor.conf.all.platforms.js",
                 debug: false
              }
            },
  },
    
  });
 
  grunt.registerTask('test', ['concat','uglify','protractor:all']);

  grunt.registerTask('default', ['concat','uglify','connect:example']);

};

