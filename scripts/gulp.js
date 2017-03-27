'use strict';

const spawn = require('child_process').spawn;

const IS_WIN = /^win/.test(process.platform);
const GULP_PATH = './node_modules/.bin/gulp'

function convertPathForPlatform(path) {
  return IS_WIN ? path.replace(new RegExp('/', 'g'), '\\') : path;
}

const args = process.argv.length > 2 ? process.argv.slice(2) : [];
const script = spawn(convertPathForPlatform(GULP_PATH), args, { stdio: 'inherit' });

script.on('exit', code => {});
