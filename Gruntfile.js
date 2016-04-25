module.exports = function(grunt) {
  var requireJsModules = [];

  grunt.file.expand({
    cwd: "src/scripts"
  }, ["**/*.js", '!lib/**/*.js']).forEach(function(file) {
    requireJsModules.push(file.replace(/\.js$/, ''));
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'bower_components/angular',
          src: ['angular.js'],
          dest: 'src/scripts/lib'
        }, {
          expand: true,
          cwd: 'bower_components/angular-route',
          src: ['angular-route.js'],
          dest: 'src/scripts/lib'
        }, {
          expand: true,
          cwd: 'bower_components/requirejs',
          src: ['require.js'],
          dest: 'src/scripts/lib'
        }, {
          expand: true,
          cwd: 'bower_components/HTML5-Reset/assets/css',
          src: ['reset.css'],
          dest: 'src/styles/css/lib'
        }]
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/scripts/**/*.js', '!src/scripts/lib/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      main: {
        files: [{
          expand: true,
          cwd: 'src/scripts',
          src: ['lib/require.js'],
          dest: 'dist/scripts',
          ext: '.js'
        }]
      }
    },
    sass: {
      options: {
        style: 'expanded'
      },
      main: {
        files: [{
          expand: true,
          cwd: 'src/styles/sass',
          src: ['**/*.scss', '!**/base.scss'],
          dest: 'src/styles/css',
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
      options: {
        map: true
      },
      main: {
        files: [{
          expand: true,
          cwd: 'src/styles/css',
          src: ['**/*.css'],
          dest: 'src/styles/pre-css',
          ext: '.css'
        }]
      },
    },
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      main: {
        files: {
          'dist/styles/main.min.css': [
            'src/styles/css/lib/reset.css',
            'src/styles/css/**/*.css'
          ]
        }
      }
    },
    uncss: {
      main: {
        files: {
          'dist/styles/main.min.css': ['dist/**/*.html']
        }
      }
    },
    htmlmin: {
      pre: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.html'],
          dest: 'dist'
        }]
      },
      main: {
        options: {
          removeComments: true,
          removeCommentsFromCDATA: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['**/*.html'],
          dest: 'dist'
        }]
      }
    },
    imagemin: {
      options: {
        optimizationLevel: 3,
        pngquant: true
      },
      main: {
        files: [{
          expand: true,
          cwd: 'src/images',
          src: ['**/*.{png,jpg,jpeg,gif,webp,svg}'],
          dest: 'dist/images'
        }]
      }
    },
    clean: {
      main: ['dist/**']
    },
    usemin: {
      html: ['dist/**/*.html']
    },
    requirejs: {
      main: {
        options: {
          baseUrl: "src/scripts",
          mainConfigFile: "src/scripts/main.js",
          optimize: "uglify",
          include: requireJsModules,
          out: "dist/scripts/main.js"
        }
      }
    },
    sprite: {
       main: {
        src: 'src/images/*.jpg',
        dest: 'src/images/sprite.png',
        destCss: 'src/styles/sass/sprite.scss'
      }
    },
    watch: {
      sass: {
        files: ['src/styles/sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-spritesmith');

  grunt.registerTask('build', ['clean', 'jshint', 'requirejs', 'uglify', 'sass', 'cssmin', 'imagemin', 'htmlmin:pre', 'usemin', 'htmlmin:main', 'uncss']);

};