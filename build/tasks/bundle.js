var gulp = require('gulp');
var bundler = require('aurelia-bundler');

var config = {
	force: true,
	packagePath: '.',
	bundles: {
		"dist/app-build": {
			includes: [
				'*',
				'*.html!text',
				'*.css!text',
				'bootstrap/css/bootstrap.css!text'
			],
			options: {
				inject: true,
				minify: true
			}
		},
		"dist/aurelia": {
			includes: [
				'aurelia-bootstrapper',
				'aurelia-fetch-client',
				'aurelia-router',
				'aurelia-animator-css',
				'github:aurelia/templating-binding',
				'github:aurelia/templating-resources',
				'github:aurelia/templating-router',
				'github:aurelia/loader-default',
				'github:aurelia/history-browser',
				'github:aurelia/logging-console',
			],
			options: {
				inject: true,
				minify: true
			}
		},
		"dist/libs": {
			includes: [
				'tinymce',
				'linq',
				'npm:superagent@1.4.0',
				'npm:uuid@2.0.1'
			],
			options: {
				inject: true,
				minify: false
			}
		}
	}
};

gulp.task('bundle', function () {
	return bundler.bundle(config);
});

gulp.task('unbundle', function () {
	return bundler.unbundle(config);
});
