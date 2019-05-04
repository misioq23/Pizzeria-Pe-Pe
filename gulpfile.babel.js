'use strict';

// Load plugins
import gulp from 'gulp';
import watchFiles from './config/gulp/watch';
import minify from 'gulp-minifier';

import { browserSync, browserSyncJSON } from './config/gulp/serv';

// define complex tasks
export const json = gulp.parallel(watchFiles, browserSyncJSON);
export const dist = () => {
	return gulp.src('build/**/*').pipe(minify({
		minify: true,
		minifyHTML: {
			collapseWhitespace: true,
			conservativeCollapse: true,
		},
		minifyJS: {
			sourceMap: false
		},
		minifyCSS: true,
		getKeptComment: function(content, filePath) {
			var m = content.match(/\/\*![\s\S]*?\*\//img);
			return m && m.join('\n') + '\n' || '';
		}
	})).pipe(gulp.dest('dist/'));
};
export default gulp.parallel(watchFiles, browserSync);
