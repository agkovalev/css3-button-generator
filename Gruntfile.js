module.exports = function(grunt){
	"use strict";
	
	// measures the time each task takes
	require('time-grunt')(grunt);
	
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		vars: {
			dirs:{
				src: "src",
				min: "min"
			}
		},

		jshint: {
			options:{
				"curly": true,
				"eqeqeq": true,
				"immed": true,
				"latedef": true,
				"newcap": true,
				"noarg": true,
				"sub": true,
				"undef": true,
				"eqnull": true,
				"browser": true,
				"globals": {
					"jQuery": true,
					"$": true,
					"angular": true,
					"console": true
				},
				force: true
			},
			'<%= pkg.name %>':{
				"src": ['<%= vars.dirs.src %>' + '/js/*.js']
			}
		},

		concat: {			
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
				separator: '\n\n;'
			},
			dist: {
				src: [
					'<%= vars.dirs.src %>/js/*.js',
				],
				dest: '<%= vars.dirs.min %>/built.js'
			}
		},

		uglify: {
			options: {
				stripBanners: true,
				banner: '/*! MINI <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: '<%= vars.dirs.min %>/built.js',
				dest: '<%= vars.dirs.min %>/built.min.js'
			}
		},

		// less: {
		// 	bootswatch: {
		// 		options: {
		// 			paths: [
		// 				// "min"
		// 			]
		// 		},
		// 		files: {
		// 			'<%= vars.dirs.src %>/css/lumen.css': '<%= vars.dirs.src %>/less/*.less'
		// 		}
		// 	}
		// },

		cssmin: {
			add_banner: {
				options: {
					banner: '/*! MINI <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
				},
				files: {
					'<%= vars.dirs.min %>/built.min.css': [
						// '<%= vars.dirs.src %>' + '/css/bootstrap/bootstrap.css',
						'<%= vars.dirs.src %>' + '/css/styles.css'
					]
				}
			}
		},

		htmlmin: {
			pages: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'index.html': 		'<%= vars.dirs.src %>/html/index.html',
				}
			}
		},

		ftpush: {
			// build: {
			// 	auth: {
			// 		host: '',
			// 		port: 21,
			// 		authKey: 'key1'
			// 	},
			// 	src: '',
			// 	dest: '',
			// 	exclusions: [''],
			// 	keep: [''],
			// 	simple: true,
			// 	useList: false
			// }
		},

		notify: {
			standard: {
				options: {
					title: 'Стандартная задача завершена!',  // optional
					message: 'Выполнены все задачи и запущен Watch.', //required
				}
			},
			prepareCss: {
				options: {
					title: 'CSS Подготовлен!',  // optional
					message: 'Все конкатенировано, сжато и отправлено на FTPush.', //required
				}	
			},
			// prepareLess: {
			// 	options: {
			// 		title: 'LESS Подготовлен!',  // optional
			// 		message: 'Все конвертировано', //required
			// 	}	
			// },
			prepareJsBuild: {
				options: {
					title: 'JS Подготовлен!',  // optional
					message: 'Concat, Uglify & FTPush.', //required
				}	
			},
			prepareHtmlPages: {
				options: {
					title: 'Сборка страниц HTML готова!',  // optional
					message: 'HTMLmin & FTPush.', //required
				}	
			}
		},

		watch: {
			css:{
				files: [
					'<%= vars.dirs.src %>' + '/css/*.css'
				],
				tasks: 'prepareCss'
			},
			jsBuild:{
				files: [
					'src/js/*.js'
				],
				tasks: 'prepareJsBuild'
			},
			htmlPages:{
				files: ['<%= vars.dirs.src %>' + '/html/*.html'],
				tasks: 'prepareHtmlPages'
			},
			// livereload: {
			// 	options: { 
			// 		livereload: true
			// 	},
			// 	files: ['min/**/*'],
			// }
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-ftpush');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	
	// grunt.registerTask('default', ['concurrent:default1', 'concurrent:default2', 'ftpush', 'notify:standard']);
	grunt.registerTask('default', [
		'concat', 
		'uglify',
		// 'less',
		'cssmin', 
		'htmlmin',
		'notify:standard', 
		'watch'
	]);
	
	// grunt.registerTask('prepareLess', ['less', 'notify:prepareLess']);
	grunt.registerTask('prepareCss', ['cssmin', 'notify:prepareCss']);
	grunt.registerTask('prepareJsBuild', ['concat:dist', 'uglify:build', 'notify:prepareJsBuild']);
	grunt.registerTask('prepareHtmlPages', ['htmlmin:pages', 'notify:prepareHtmlPages']);

}