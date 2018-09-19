#!/usr/bin/env node

/**
 * 程序入口
 */

var _ = require('underscore');

var cmds = [ 'create', 'build', 'server' ];
var runners = [];
_.each(cmds, function (cmd) {
    runners[cmd] = require('./' + cmd + '_runner');
});

var help = function () {
    console.log('Usage:');
    console.log('    papery -v or --version');
    console.log('    papery -h or --help');
    console.log('    papery command [options]');
    console.log('    papery help command');
    console.log('');
    console.log('Commands:');
    console.log('    create - Create a new blog');
    console.log('    build  - Build all site from config and meta-text');
    console.log('    server - Start a new local web server for test and debug');
};

var version = function () {
    var pack = require('../package.json');
    console.log('Version: ' + pack.version);
}

var showHelp = function (cmd) {
    runners[cmd].help();
};

var checkArgs = function (args) {
    if (args.length >= 2) {
        if (args[2] === '-v' || args[2] === '--version') {
            version();
            process.exit(1);
        }
        if (args[2] === '-h' || args[2] === '--help') {
            help();
            process.exit(1);
        }
        if (args.length >= 4 && args[2] === 'help' && _.contains(cmds, args[2])) {
            showHelp(args[2]);
            process.exit(1);
        }
        if (!_.contains(cmds, args[2])) {
            help();
            process.exit(1);
        }
        return 0;
    } else {
        help();
        process.exit(1);
    }
};

var args = !(process.argv[0] === 'node' ||
    process.argv[0] === 'nodejs' ||
    process.argv[0].match(/node.exe$/) ||
    process.argv[0].match(/node$/)) ? process.argv : _.last(process.argv, process.argv.length - 1);

checkArgs(args);
var cmd = args[2];
var options = _.last(args, args.length - 3);
//console.dir(options);

runners[cmd].run(options);

