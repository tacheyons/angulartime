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

     regex_extract: {
        default_options: {
            options: {
                regex : "<div(.*|\n*)>(\s*|\n*)<\/div>"
            },
            files: {
                'dist/xls/index.xls': ['public/index.html']
            }
        }
    },
   
    
  });
 
  grunt.registerTask('test', ['concat','uglify','regex_extract']);

  grunt.registerTask('default', ['concat','uglify']);

};

