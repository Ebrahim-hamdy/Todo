'use strict';

module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var appConfig = {
		src: 'src',
		dist: 'dist',
		tmp: '.tmp'
	};

	grunt.initConfig({

		appConfig: appConfig,

		wiredep: {
			target: {
				src: '<%= appConfig.src %>/index.html',
				ignorePath: '../'
			}
		},

		connect: {
			options: {
				port: 9000,
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					middleware: function (connect) {
						return [
							connect.static('<%= appConfig.tmp %>'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect.static(appConfig.src)
						];
					}
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= appConfig.dist %>'
				}
			}
		},

		watch: {
			livereload: {
				files: ['<%= appConfig.src %>/**/*.*'],
				options: {
					nospawn: true,
					livereload: '<%= connect.options.livereload %>'
				}
			}
		},

		clean: {
			beforeBuild: {
				dot: true,
				src: ['<%= appConfig.tmp %>', '<%= appConfig.dist %>']
			},
			afterBuild: {
				dot: true,
				src: ['<%= appConfig.tmp %>', '.tmp']
			}
		},

		useminPrepare: {
			html: '<%= appConfig.src %>/index.html',
			options: {
				dest: '<%= appConfig.dist %>'
			}
		},

		copy: {
			dist: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= appConfig.src %>',
						dest: '<%= appConfig.dist %>',
						src: [
							'index.html',
							'Assets/img/{,*/}*.*'
						]
					},
					{
						expand: true,
						dot: true,
						cwd: 'bower_components/bootstrap',
						src: ['fonts/*.*'],
						dest: '<%= appConfig.dist %>/Assets'
					},
					 {
						expand: true,
						dot: true,
						cwd: 'bower_components/components-font-awesome',
						src: ['fonts/*.*'],
						dest: '<%= appConfig.dist %>/Assets'
					},
					{
						expand: true,
						dot: true,
						cwd: '<%= appConfig.src %>/Assets/css',
						src: ['patterns/*.*'],
						dest: '<%= appConfig.dist %>/Assets/css'
					}
				]
			}
		},

		uglify: {
			options: {
				mangle: false
			}
		},

		filerev: {
			dist: {
				src: [
					 '<%= appConfig.dist %>/scripts.js',
					 '<%= appConfig.dist %>/vendor.js',
					 '<%= appConfig.dist %>/Assets/css/styles.css',
					 '<%= appConfig.dist %>/Assets/css/vendor.css'
				]
			}
		},

		usemin: {
			html: ['<%= appConfig.dist %>/index.html']
		},

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= appConfig.src %>',
					src: ['App/**/*.html'],
					dest: '<%= appConfig.dist %>'
				}]
			}
		}

	});

	grunt.registerTask('dev', [
		'wiredep',
		'connect:livereload',
		'watch'
	]);

	grunt.registerTask('live', [
		'build',
		'connect:dist:keepalive'
	]);

	grunt.registerTask('build', [
		'wiredep',
		'clean:beforeBuild',
		'useminPrepare',
		'concat',
		'copy:dist',
		'cssmin',
		'uglify',
		'filerev',
		'usemin',
		'htmlmin',
		'clean:afterBuild'
	]);

};
