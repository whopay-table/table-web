'use strict';

var gulp = require('gulp');
var git = require('gulp-git');
var gitDependencies = require('./assets/git-dependencies');
var react = require('gulp-react');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var replace = require('gulp-replace');
var conflict = require('gulp-conflict');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var rmdirp = require('rmdirp');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var argv = require('yargs').argv;
var pathExists = require('path-exists');
var shell = require('gulp-shell');
var spawn = require('child_process').spawn;
var webserver = require('gulp-webserver');
var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');
var webpackConfig = require('./assets/webpack-conf');
var yarn = require('gulp-yarn');
var isWin = /^win/.test(process.platform);

gulp.task('git-set-ssh-key-chmod', function(callback) {
  // Change permission of id_rsa file to prevent error
  // when using the key on accessing git repositories.

  try {
    var script = spawn('chmod', '0600 ./assets/id_rsa'.split(' '), { stdio: 'inherit' });
    script.on('exit', function (code) {
      if (callback) {
        callback();
      }
    });
  } catch (err) {
    if (callback) {
      callback();
    }
  }
});

gulp.task('git-set-ssh-key', ['git-set-ssh-key-chmod'], function() {
  const commands = [
    'ssh',
    '-o',
    'StrictHostKeyChecking=no',
    '-i',
    __dirname.replace(/\\/g, '/') + '/assets/id_rsa'
  ];
  return process.env.GIT_SSH_COMMAND = commands.join(' ');
});

gulp.task('git-install', ['git-set-ssh-key'], function(callback) {
  function clone(title, path, dep, cb) {
    git.clone(dep.repository, { args: path }, function(err) {
      if (err) {
        throw err;
      } else {
        if (cb) {
          cb();
        }
      }
    });
  }
  function checkoutByBranch(title, path, dep, branch, cb) {
    git.checkout(branch, { args: '--quiet', cwd: path }, function (err) {
      if (err) {
        throw err;
      } else {
        git.pull('origin', branch, { args: '--quiet', cwd: path }, function(err) {
          if (err) {
            throw err;
          } else {
            if (cb) {
              cb();
            }
          }
        });
      }
    });
  }
  function checkoutByTag(title, path, dep, tag, cb) {
    checkoutByBranch(title, path, dep, 'tags/' + tag, cb);
  }
  function checkoutByTagPattern(title, path, dep, cb) {
    git.exec({
      args: 'tag -l ' + dep.tag + ' --sort=-v:refname',
      cwd: path
    }, function(err, stdout) {
      if (err) {
        throw err;
      } else {
        if (stdout === '') {
          var msg = 'No tag found with ' + dep.tag + ' from ' + title + '.';
          throw msg;
        } else {
          var tag = stdout.split('\n')[0];
          checkoutByTag(title, path, dep, tag, cb);
        }
      }
    });
  }
  function update(title, path, dep, cb) {
    git.fetch('', '', { args: '--all --tags --prune --quiet', cwd: path }, function (err) {
      if (err) {
        throw err;
      } else {
        git.reset('HEAD', { args: '--hard', cwd: path }, function(err) {
          if (err) {
            throw err;
          } else {
            if (dep.tag) {
              checkoutByTagPattern(title, path, dep, cb);
            } else if (dep.branch) {
              checkoutByBranch(title, path, dep, dep.branch, cb);
            } else {
              checkoutByBranch(title, path, dep, 'master', cb);
            }
          }
        })
      }
    });
  }
  function setRemote(title, path, dep, cb) {
    git.exec({ args: 'remote set-url origin ' + dep.repository, cwd: path, quite: true }, function (err) {
      if (err) {
        throw err;
      } else {
        update(title, path, dep, cb);
      }
    });
  }

  var titles = Object.keys(gitDependencies).filter(t => !t.startsWith('_'));
  for (var i = 0; i < titles.length; i++) {
    var title = titles[i];
    var dep = gitDependencies[title];
    var path = './git_repositories/' + title;
    var cb = titles.length - 1 === i ? callback : undefined;

    if (!pathExists.sync(path)) {
      clone(title, path, dep, function() {
        update(this.title, this.path, this.dep, this.cb);
      }.bind({ title: title, path: path, dep: dep, cb: cb }));
    } else {
      git.exec({
        args: 'rev-parse --show-toplevel',
        cwd: path
      }, function(err, stdout) {
        if (err) {
          throw err;
        } else {
          if (stdout.trim().endsWith('/git_repositories/' + this.title)) {
            setRemote(this.title, this.path, this.dep, this.cb);
          } else {
            rmdirp(path, {}, function() {
              clone(this.title, this.path, this.dep, function() {
                update(this.title, this.path, this.dep, this.cb);
              }).bind(this);
            });
          }
        }
      }.bind({ title: title, path: path, dep: dep, cb: cb }));
    }
  }
});

gulp.task('yarn-install-elice-blocks', ['git-install'], function() {
  // This task changes current working directory and does not restore.
  // Therefore the task should not be used individually without yarn-build-elice-blocks.
  process.chdir(__dirname + '/git_repositories/elice-blocks');
  return gulp.src(['./package.json'])
    .pipe(yarn());
});

gulp.task('yarn-build-elice-blocks', ['yarn-install-elice-blocks'], function(callback) {
  var script = spawn('node', ['gulp.js', 'build'], { stdio: 'inherit' });
  script.on('exit', function (code) {
    process.chdir(__dirname);
    callback();
  });
});

gulp.task('install-elice-blocks', ['yarn-build-elice-blocks'], function(callback) {
  function yarn(arg, cwd, cb) {
    var script = null;
    if (isWin) {
      script = spawn('cmd', ['/s', '/c', 'yarn'].concat(arg.split(' ')), { stdio: 'inherit', cwd: cwd });
    } else {
      script = spawn('yarn', arg.split(' '), { stdio: 'inherit', cwd: cwd });
    }
    script.on('exit', function (code) {
      if (cb) {
        cb(code);
      }
    });
  }
  yarn('link', __dirname + '/git_repositories/elice-blocks', function() {
    yarn('link elice-blocks', undefined, function() {
      callback();
    });
  });
});

gulp.task('init-configs', ['git-install', 'install-elice-blocks'], function() {
  return gulp.src('./web/src/js/configs/examples/**/*.*', {'base': './web/src/js/configs/examples'})
    .pipe(conflict('./web/src/js/configs/', {defaultChoice: 'n'}))
    .pipe(gulp.dest('./web/src/js/configs/', {overwrite: true}));
});

gulp.task('gitlab-ci-configs', function() {
  return gulp.src('./web/src/js/configs/gitlab-ci/**/*.*', {'base': './web/src/js/configs/gitlab-ci'})
    .pipe(gulp.dest('./web/src/js/configs/', {overwrite: true}));
});

gulp.task('clean-dist', function() {
  return gulp.src('./web/dist/**/*.*', {read: false})
    .pipe(vinylPaths(del));
});

gulp.task('copy-index-html-dev', ['clean-dist'], function() {
  return gulp.src('./web/src/index.html')
    .pipe(replace('{{ENV}}', 'development'))
    .pipe(gulp.dest('./web/dist'));
});

gulp.task('copy-index-html', ['clean-dist'], function() {
  return gulp.src('./web/src/index.html')
    .pipe(replace('{{ENV}}', 'production'))
    .pipe(gulp.dest('./web/dist'));
});

gulp.task('copy-images', ['clean-dist'], function() {
  return gulp.src('./web/src/imgs/**/*.*', {'base': './web/src/imgs'})
    .pipe(gulp.dest('./web/dist/imgs/'));
});

gulp.task('copy-documents', ['clean-dist'], function() {
  return gulp.src('./web/src/docs/**/*.*', {'base': './web/src/docs'})
    .pipe(gulp.dest('./web/dist/docs/'));
});

gulp.task('copy-assets-dev', ['copy-index-html-dev', 'copy-images', 'copy-documents']);
gulp.task('copy-assets', ['copy-index-html', 'copy-images', 'copy-documents']);

gulp.task('webpack-dev-server', ['copy-assets-dev'], function(callback) {
  var myConfig = Object.create(webpackConfig);

  var devtool = '#eval-source-map';
  if (argv.devtool) {
    devtool = argv.devtool;
  }
  var host = '0.0.0.0';
  if (argv.host) {
    host = argv.host;
  }
  var port = 8080;
  if (argv.port) {
    port = parseInt(argv.port);
  }
  port += 1

  myConfig.devtool = devtool;
  myConfig.plugins = [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ];

  new WebpackDevServer(webpack(myConfig), {
    quiet: argv.quiet,
    contentBase: 'web/dist',
    publicPath: '/assets',
    stats: {
      colors: true
    }
  }).listen(port, host, function(err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', 'Webpack dev server running on port ' + port);
  })
});

gulp.task('redirect-proxy', function(callback) {
  var port = 8080;
  if (argv.port) {
    port = parseInt(argv.port);
  }

  var host = '0.0.0.0';
  if (argv.host) {
    host = argv.host;
  }

  var app = express();
  app.use('/assets', proxy(url.parse('http://localhost:' + (port + 1) + '/assets')));
  app.use('/imgs', proxy(url.parse('http://localhost:' + (port + 1) + '/imgs')));
  app.use('/docs', proxy(url.parse('http://localhost:' + (port + 1) + '/docs')));

  app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/web/src/index.html');
  });

  app.listen(port, host, undefined, function() {
    gutil.log('[redirect-proxy]', 'Redirection proxy running on port ' + port);
    gutil.log('[redirect-proxy]', 'Try out http://' + host + ':' + port + ' on your browser.');
  });
});

gulp.task('jsdoc', shell.task([
  'node jsdoc.js'
]));

gulp.task('watch-dev', ['copy-assets-dev', 'jsdoc'], function(callback) {
  if ((!argv.nolivedoc) || (!argv.nodoc)) {
    gulp.watch('./web/src/js/**/*.js', ['jsdoc']);
  }
});

gulp.task('doc-server', ['copy-assets-dev', 'jsdoc'], function(callback) {
  if (!argv.nodoc) {
    var dochost = '0.0.0.0';
    if (argv.dochost) {
      dochost = argv.dochost;
    }
    var docport = 8090;
    if (argv.docport) {
      docport = parseInt(argv.docport);
    }

    gutil.log('[documentation-server]', 'Running on port ' + docport + '.');

    gulp.src('./documentation').pipe(webserver({
      livereload: true,
      host: dochost,
      port: docport
    }));
  }
});

gulp.task('webpack-build', ['copy-assets', 'jsdoc', 'install-elice-blocks', 'git-install'], function(callback) {
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: !argv.quiet
      },
      sourceMap: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.IgnorePlugin(/imports[\/\\]reactPerf(\.js)?$/)
  );

  webpack(myConfig, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack-build', err);
    }
    gutil.log('[webpack-build]', stats.toString({
      colors: true,
      chunks: !argv.quiet
    }));
    mkdirp('./log', function(err) {
      if (err) {
        throw new gutil.PluginError('webpack-build', err);
      }
    });
    try {
      fs.writeFileSync('./log/webpack_build_stat.log.json', JSON.stringify(stats.toJson()));
    }
    catch (err) {
      throw new gutil.PluginError('webpack-build', err);
    }
    gutil.log('[webpack-build]', 'Log file is saved.');
    callback();
  });
});

gulp.task('version', ['webpack-build'], function() {
  return gulp.src('./web/dist/assets/app.js')
    .pipe(rev())
    .pipe(gulp.dest('./web/dist/assets'))
    .pipe(rev.manifest('manifest.json'))
    .pipe(gulp.dest('./web/dist/assets'));
});

gulp.task('html-version', ['version'], function() {
  return gulp.src('./web/dist/index.html')
    .pipe(revReplace({ manifest: gulp.src('./web/dist/assets/manifest.json') }))
    .pipe(gulp.dest('./web/dist'));
});

gulp.task('clean-app', ['html-version'], function() {
  return gulp.src('./web/dist/assets/app.js', {read: false})
    .pipe(vinylPaths(del));
});

gulp.task('clean-manifest', ['html-version'], function() {
  return gulp.src('./web/dist/assets/manifest.json', {read: false})
    .pipe(vinylPaths(del));
});

gulp.task('postinstall', ['install-elice-blocks', 'git-install', 'init-configs']);
gulp.task('install-gitlab-ci', ['gitlab-ci-configs']);
gulp.task('default', ['redirect-proxy', 'webpack-dev-server', 'watch-dev', 'doc-server']);
gulp.task('release', ['clean-app', 'clean-manifest']);
