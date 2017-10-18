'use strict';

const argv = require('yargs').argv;
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const gutil = require('gulp-util');
const mkdirp = require('mkdirp');
const path = require('path');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const uglify = require('gulp-uglify');
const vinylPaths = require('vinyl-paths');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./assets/webpack-config');

const CONFIG_PATH = './temp/config.js'
const CONFIG_KEYS = ['WEB_API_URL', 'WEB_DOMAIN', 'GA_TRACKING_ID'];

const DEFAULT_DEV_TOOL = '#eval-source-map';
const DEFAULT_DEV_HOST = '0.0.0.0';
const DEFAULT_DEV_PORT = 8080;

gulp.task('clean-temp', () => {
  return gulp.src('./temp/**/*.*', {read: false})
    .pipe(vinylPaths(del));
});

gulp.task('clean-build', () => {
  return gulp.src('./build/**/*.*', {read: false})
    .pipe(vinylPaths(del));
});

gulp.task('write-config-file', ['clean-temp'], callback => {
  const configBody = `window.__CONFIG__ = {${CONFIG_KEYS.map(key => `"${key}": "${process.env[key]}"`).join(',')}};`;

  mkdirp(path.dirname(CONFIG_PATH), err => {
    if (err) {
      throw new gutil.PluginError('write-config-file', err);
    }

    fs.writeFile(CONFIG_PATH, configBody, err => {
      if (err) {
        throw new gutil.PluginError('write-config-file', err);
      }
      callback();
    });
  });
});

gulp.task('copy-static-files', ['clean-build'], () => {
  return gulp.src('./public/**/*.*', {'base': './public'})
    .pipe(gulp.dest('./build/'));
});

gulp.task('webpack-dev-server', ['copy-static-files', 'write-config-file'], callback => {
  const devConfig = Object.create(webpackConfig);
  const devtool = DEFAULT_DEV_TOOL;
  const host = DEFAULT_DEV_HOST;
  const port = DEFAULT_DEV_PORT;

  devConfig.devtool = devtool;
  devConfig.plugins = devConfig.plugins.concat(
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  );

  new WebpackDevServer(webpack(devConfig), {
    historyApiFallback: true,
    quiet: argv.quiet,
    contentBase: 'build',
    publicPath: '/assets',
    stats: {
      colors: true
    }
  }).listen(port, host, function(err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', `Webpack dev server running on port ${port}`);
  });
});

gulp.task('webpack-build', ['copy-static-files', 'write-config-file'], callback => {
  const devConfig = Object.create(webpackConfig);
  devConfig.plugins = devConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: !argv.quiet
      },
      sourceMap: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  );

  webpack(devConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack-build', err);
    }
    gutil.log('[webpack-build]', stats.toString({
      colors: true,
      chunks: !argv.quiet
    }));
    mkdirp('./logs', function(err) {
      if (err) {
        throw new gutil.PluginError('webpack-build', err);
      }
    });
    try {
      fs.writeFileSync('./logs/webpack-build-stat.json', JSON.stringify(stats.toJson()));
    }
    catch (err) {
      throw new gutil.PluginError('webpack-build', err);
    }
    gutil.log('[webpack-build]', 'Log file is saved.');
    callback();
  });
});

gulp.task('version-js', ['webpack-build'], () => {
  return gulp.src('./build/assets/app.js')
    .pipe(rev())
    .pipe(gulp.dest('./build/assets'))
    .pipe(rev.manifest('manifest.json'))
    .pipe(gulp.dest('./build/assets'));
});

gulp.task('version-import-js', ['version-js'], () => {
  return gulp.src('./build/index.html')
    .pipe(revReplace({ manifest: gulp.src('./build/assets/manifest.json') }))
    .pipe(gulp.dest('./build'));
});

gulp.task('clear-js', ['version-import-js'], () => {
  return gulp.src('./build/assets/app.js', {read: false})
    .pipe(vinylPaths(del));
});

gulp.task('clear-manifest', ['version-import-js'], () => {
  return gulp.src('./build/assets/manifest.json', {read: false})
    .pipe(vinylPaths(del));
});

gulp.task('post-webpack-build', ['clear-js', 'clear-manifest']);


// Main tasks:
gulp.task('develop', ['webpack-dev-server']);
gulp.task('build', ['webpack-build', 'post-webpack-build'])

gulp.task('default', ['develop']);
