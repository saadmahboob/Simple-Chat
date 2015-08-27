module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      copy: {
        build: {
          cwd: './',
          src: [ 'css/**', 'js/**', 'images/**', 'server.js' ],
          dest: 'build',
          expand: true
        },
        stylesheets: {
          cwd: './',
          src: [ 'css/**' ],
          dest: 'build',
          expand: true
        },
        js: {
          cwd: './',
          src: [ 'js/**' ],
          dest: 'build',
          expand: true
        },
        server: {
          cwd: './',
          src: [ 'server.js' ],
          dest: 'build',
          expand: true
        },
        html: {
          cwd: './',
          src: [ 'index.html' ],
          dest: 'build',
          expand: true
        },
        images: {
          cwd: './',
          src: [ 'images/**' ],
          dest: 'build',
          expand: true
        }
      },
      clean: {
        build: {
          src: [ 'build' ]
        },
        stylesheets: {
          src: [ 'build/css/*.css', '!build/css/main.min.css' ]
        },
        js: {
          src: [ 'build/js/**/*.js', '!build/js/views/views.js', '!build/js/controllers/controllers.js'  ]
        },
      },
      cssmin: {//minify css in build 
        build: {
          files: {
            'build/css/main.min.css': [ 'build/css/**.css' ]
          }
        }
      },
      uglify: {
        build: {
          options: {
            mangle: false
          },
          files: {
            'build/js/controllers/controllers.js': [ 'build/js/controllers/*.js' ],
            'build/js/views/views.js': [ 'build/js/views/*.js' ]

          }
        }
      },
      watch: {
        options: {
          livereload: true
        },
        stylesheets: {
          files: './css/*.css',
          tasks: [ 'stylesheets' ]
        },
        js: {
          files: ['js/controllers/*.js', 'js/views/*.js'],
          tasks: [ 'js' ]
        },
        copy: {
          files: [ '**', '!./css/*.css', '!js/controllers/*.js', '!js/views/*.js' ],
          tasks: [ 'build' ]
        }
      },
      connect: {
        server: {
          options: {
            port: 4000,
            base: 'build',
            hostname: '*'
          }
        }
      }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  //registering css compiling task
  grunt.registerTask(
    'stylesheets', 
    'Compiling css files.',
    ['copy:stylesheets','cssmin', 'clean:stylesheets']);

  //registering javascripts compiling task
  grunt.registerTask(
    'js', 
    'Compiling js files.',
    ['copy:js', 'uglify', 'clean:js']);

  // Duild task
  grunt.registerTask('build', ['clean:build', 'copy:html', 'copy:images', 'stylesheets', 'js']);

  grunt.registerTask(
    'default', 
    'Watches the project for changes, automatically builds them and runs a server.', 
    [ 'build', 'connect', 'watch' ]
  );

};