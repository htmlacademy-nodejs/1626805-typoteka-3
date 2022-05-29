'use strict';

const CliCommandName = {
  VERSION: `--version`,
  HELP: `--help`,
  SERVER: `--server`,
  FILL: `--fill`,
  FILLDB: `--filldb`,
};

const CliExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};

module.exports = {
  CliCommandName,
  CliExitCode
};
