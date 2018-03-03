const gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	fs = require('fs'),
	browserify = require('browserify');

gulp.task('sass', function() {
	return gulp
		.src('app/sass/**/*.scss') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({ stream: true })); // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('browserify', function() {
	var options = {
		debug: true,
		entries: 'app/js/dev/main.js', // Entry point
		extensions: [ '.js' ], // consider files with these extensions as modules
		paths: [ './app/js/' ] // This allows relative imports in require, with './scripts/' as root
	};
	return browserify(options)
		.transform('babelify', { presets: [ 'es2015' ], sourceMaps: true })
		.bundle()
		.pipe(fs.createWriteStream('app/js/prod/bundle.js'));
});

gulp.task('watch', [ 'browser-sync', 'sass', 'browserify' ], function() {
	gulp.watch('app/sass/**/*.scss', [ 'sass' ]); // Наблюдение за sass файлами
	gulp.watch('app/css/.*', browserSync.reload); // Наблюдение за другими типами файлов
	gulp.watch('app/js/dev/**/*.js', [ 'browserify', browserSync.reload ]);
});
