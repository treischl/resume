const build = require('./build');

require('yargs')
  .usage('$0 <cmd> [args]')
  .command(
    'build',
    'Builds the resume from the JSON files.',
    (yargs) => {
      yargs
        .positional('include', {
          type: 'string',
          describe:
            'Resume sections to include. If left empty, all sections are included.',
        })
        .array('include')
        .positional('exclude', {
          type: 'string',
          describe: 'Resume sections to exclude.',
        })
        .array('exclude')
        .positional('include-private', {
          type: 'string',
          describe: 'Private resume sections to include.',
        })
        .array('include-private');
    },
    (argv) => {
      console.log('Building resume');
      build(argv);
      console.log('Build complete');
    },
  )
  .help().argv;

module.exports = require('jsonresume-theme-stackoverflow');
