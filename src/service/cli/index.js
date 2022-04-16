'use strict';

const version = require(`./version`);
const help = require(`./help`);
const generate = require(`./generate`);
const filldb = require(`./filldb`);
const server = require(`./server`);

const Cli = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate,
  [server.name]: server,
  [filldb.name]: filldb
};

module.exports = {
  Cli,
};
