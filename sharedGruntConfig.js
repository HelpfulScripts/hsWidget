const path = require('path');
const webpack = require("webpack");
//const webpackConfig = require('./webpack.config');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (grunt, dir, dependencies, type) => {
    const pkg = grunt.file.readJSON(dir+'/package.json');
    const slash = pkg.name.lastIndexOf('/');
    const lib = slash<0? pkg.name : pkg.name.slice(slash+1);
    const libPath = lib.toLowerCase();
    console.log(dir);    

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-typedoc');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-webpack');

    //------ Add Doc Tasks
    grunt.registerTask('doc', ['clean:docs', 'typedoc', 'copy:docs']);

    //------ Add Staging Tasks
    grunt.registerTask('stage', [`${(type === 'app')? 'copy:stageApp': 'copy:deployLib'}`]);
    
    //------ Add Test Tasks
    grunt.registerTask('ospec', () => { require('child_process').spawnSync('npm', ['test'], {stdio: 'inherit'}); });
    if (type === 'node') { 
        grunt.loadNpmTasks('grunt-jasmine-node-coverage');
        grunt.registerTask('test', ['clean:test', 'copy:test', 'build-specES5', 'jasmine_node' ]); }
    else { 
        grunt.registerTask('test', ['clean:test', 'copy:test', 'build-spec', /*'ospec'*/ ]); 
    }
    
    //------ Add Build Tasks
    grunt.registerTask('build-html',    ['copy:build']);
    grunt.registerTask('build-css',     ['less']);
    grunt.registerTask('build-example', ['clean:example', 'copy:example', 'ts:example', 'less:example', 'webpack:exampleDev']);
    grunt.registerTask('build-app',     ['copy:example', 'webpack:appDev']);
    grunt.registerTask('build-js',      ['tslint:src', 'ts:src']);
    grunt.registerTask('build-es5',     ['tslint:src', 'ts:srcES5']);
    grunt.registerTask('build-jsMin',   ['ts:srcMin']);
    grunt.registerTask('build-spec',    ['tslint:spec', 'ts:test']);    
    grunt.registerTask('build-specES5', ['tslint:spec', 'ts:testES5']);    

    let buildTasks = ['clean:src', 'build-html', 'build-css'];
    switch (type) {
        case 'node': buildTasks = buildTasks.concat(['build-es5', 'copy:example']); break;
        case 'util': buildTasks = buildTasks.concat(['build-js']); break;
        case 'app':  buildTasks = buildTasks.concat(['build-js', 'build-app']); break;
        case 'lib': 
        default:     buildTasks = buildTasks.concat(['build-js', 'build-example']); break;
    }
    grunt.registerTask('build', buildTasks);
    grunt.registerTask('buildMin', ['build-jsMin']);
   
    //------ Add other MultiTasks
    grunt.registerTask('make',    ['build', 'test', 'doc', 'stage']);
    grunt.registerTask('once',    ['make']);	
    grunt.registerTask('default', ['make', 'watch']);	
    grunt.registerTask('product', ['buildMin', 'webpack:appProd', 'stage']);	
       
    //------ Add general help 
    grunt.registerTask('h', 'help on grunt options', function() {
        grunt.log.writeln(`  grunt: \t make, then watch`);
        grunt.log.writeln(`  grunt once: \t make only, don't watch`);
        grunt.log.writeln(`  grunt make: \t build, test, doc, and stage`);
        grunt.log.writeln(`  grunt product: make optimized, don't watch; relevant for apps only`);
    }); 	

    //------ Add Task Configurations
    return {
        pkg: grunt.file.readJSON(dir+'/package.json'),
        libPath: grunt.config.process(lib).toLowerCase(),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        clean: {
			src:    ['_dist'],
            docs:   ['_dist/docs'],
            test:   ['_dist/**/tests'],
            example:['_example', '_dist/example']
        },
        copy: {
            build:  { expand:true, cwd:'src/', 
                src:['*.html'], dest:'_dist/' 
            },
            example:{ expand:true, cwd: 'src/example', 
                src:['**/*', '!**/*.ts'], dest:'_dist/example' 
            },
            deployLib: { files: [
                { expand:true, cwd: '_dist/src', 
                    src:['**/*'], dest:`node_modules/${libPath}/` },
                { expand:true, cwd: './', 
                    src:['./package.json'], dest:`node_modules/${libPath}/` }
            ]},
            stageApp: { files: [
                { expand:true, cwd: '_dist/src', 
                    src:['**/*.css*'], dest:'_dist' },
                { expand:true, cwd: './', 
                    src:['./package.json'], dest:`node_modules/${libPath}/` }
            ]},
            docs:   { files: [
                { expand:true, cwd: '_dist/docs', 
                    src:['**/*.json'], dest:`node_modules/${libPath}/docs`},
                { expand:true, cwd: './', 
                    src:['*.md'], dest:`node_modules/${libPath}`}
            ]},
		    test: { files: [
                { expand:true, cwd:'_dist/',    
                    src:['*.js', '*.css', '*.html'], dest:'_dist/test/'
                },
                { cwd:'example/', expand:true, src:['*.json'], dest:'_dist/test/'}
            ]}
        },
        less: {
            options: {
                sourceMap: true
            },
            css: {
                files: {
                    '_dist/src/<%= pkg.name %>.css': 'src/css/<%= pkg.name %>.less'
                }
            },
            example: {
                files: {
                    '_dist/example/<%= pkg.name %>.css': `src/example/${libPath}.less`
                }
            }
        },
        tslint: {
            options: {
                configuration: __dirname+'/tslint.json',
                force:  false,
                fix:    false
            },
            src: {
                src: ["src/**/*.ts", "!src/**/*.spec.ts"]
            },
            spec: {
                src: ["src/**/*.spec.ts"]
            }
        },
        ts: {
            src : {
                outDir:     "_dist/src",
                src: ["src/**/*.ts", "!src/**/*.spec.ts", "!src/example/*.ts"],
                tsconfig:   __dirname+'/tsconfigGrunt.json'
            },
            srcES5 : {
                outDir:     "_dist/src",
                src: ["src/**/*.ts", "!src/**/*.spec.ts", "!src/example/*.ts"],
                tsconfig:   __dirname+'/tsconfigGruntES5.json'
            },
            srcMin : {
                outDir:     "_dist/src",
                src: ["src/**/*.ts", "!src/**/*.spec.ts", "!src/example/*.ts"],
                tsconfig:   __dirname+'/tsconfigProduct.json'
            },
            example : {
                outDir:     "_example",
                src: ["src/example/*.ts"],
                tsconfig:   __dirname+'/tsconfigGrunt.json'
            },
            test : {
                outDir:     "_dist/tests",
                src: ["src/**/*.spec.ts"],
                tsconfig:   __dirname+'/tsconfigGrunt.json'
            },
            testES5 : {
                outDir:     "_dist/tests",
                src: ["src/**/*.spec.ts"],
                tsconfig:   __dirname+'/tsconfigGruntES5.json'
            }
        },
        typedoc: {
            code: {
                options: {
                    target: 'es6',
                    module: 'commonjs',
                    moduleResolution: "node",
                    json:   `_dist/docs/${lib}.json`,
                    out:    '_dist/docs',
                    mode:   'modules',
                    name:   `${lib}`
                },
                src: ['src/**/*.ts']
            }
        },
		jasmine_node: {
			options: { forceExit: true },
			all: {
				options: {
                    projectRoot: '_dist/tests',
					coverage: {
						reportDir: '_dist/docs/tests',
                        relativize: true,
						includeAllSources: true,
						report: ['html']
					},
					jasmine: {
						spec_dir: '',
						spec_files: [
						    '_dist/tests/*.spec.js'
						]
					}
				},
				src: ['_dist/test/**/*.js'] 
			}
		},

        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            appProd: { 
                entry: './_dist/src/index.js',
                output: {
                    filename: `${lib}.js`,
                    path: path.resolve(dir, './_dist')
                },
                plugins: [
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            ecma: 6,
                            mangle:false
                        }
                    })
                ]
            },
            appDev: {
                entry: './_dist/src/index.js',
                devtool: "inline-source-map",
                output: {
                    filename: `${lib}.js`,
                    path: path.resolve(dir, './_dist')
                }
            },

            exampleProd: { 
                entry: './_example/example/start.js',
                output: {
                    filename: `${lib}.js`,
                    path: path.resolve(dir, '_dist/example')
                }
            },
            exampleDev: { 
                entry: './_example/example/start.js',
                devtool: "inline-source-map",
                output: {
                    filename: `${lib}.js`,
                    path: path.resolve(dir, '_dist/example')
                }
            }
        },
        watch: {
            dependencies: {
                files: dependencies.map(d => `./node_modules/${d.toLowerCase()}/index.js`),
				tasks: ['make']
            },
			gruntfile: {
                files: ['Gruntfile.js', __dirname+'/sharedGruntConfig.js'], 
				tasks: ['make']
			},
			js: {
				files: ['src/**/*.ts', '!src/**/*.spec.ts', '!src/**/*.less'],
				tasks: ['make']
			},
			less: {
				files: ['src/**/*.less'],
				tasks: ['build-css', 'stage']
			},
			html: {
				files: ['src/**/*.html'],
				tasks: ['build-html', 'stage']
			},
			specs: {
				files: ['src/**/*.spec.ts'],
				tasks: ['test']
			}
		}
    }
};

