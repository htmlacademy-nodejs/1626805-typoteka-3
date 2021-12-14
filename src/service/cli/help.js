'use strict';

const chalk = require(`chalk`);

module.exports = {
  name: `--help`,
  run() {
    const message = `
      Программа запускает http-сервер и формирует файл с данными для API.
      Гайд:
      service.js <command>
      Команды:
        --version: выводит номер версии
        --help: печатает этот текст
        --generate <count> формирует файл mocks.json
        --server запускает API сервер
    `;
    // white потому что у меня тема в терминале темная ;)
    console.info(chalk.white(message));
  }
};
