const { argv } = require('yargs');
const { series } = require('async');
const { clean, sprite, root } = require('./scripts');
const { failOnMissingArg } = require('../utils/args');

const PACKAGES = argv.p;
const BUILD_DIR = argv.b;
const SRC_DIR = argv.s;

const checkArguments = () => {
  failOnMissingArg(PACKAGES, '--packages');
  failOnMissingArg(BUILD_DIR, '--build');
  failOnMissingArg(SRC_DIR, '--source');
};

exports.run = () => {
  checkArguments();

  series([
    clean(PACKAGES, BUILD_DIR),
    sprite(PACKAGES, SRC_DIR, BUILD_DIR),
    root(PACKAGES, BUILD_DIR),
  ]);
};
