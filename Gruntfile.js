/*global module:false*/
module.exports = function(grunt) {
    const sgc  = require('./sharedGruntConfig')(grunt, __dirname, ['hsLayout'], 'lib');
	grunt.initConfig(sgc); 
};
