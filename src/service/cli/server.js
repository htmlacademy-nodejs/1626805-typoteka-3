const fs = require('fs');
const path = require('path');
const http = require('http');
const chalk = require('chalk');

const { DEFAULT_PORT, HTTP_STATUS_CODE } = require('../../constants');

const getList = (res) => {  
  const pathToFile = path.join(__dirname, '../../..', 'mock.json');

  fs.readFile(pathToFile, 'utf8', (err, data) => {
    if(err) {
      res.writeHead(HTTP_STATUS_CODE.NOT_FOUND);
      res.end('Not found');
    }

    const articles = JSON.parse(data);
    const listTitles = articles.reduce((acc, article) => { 
      const { title } = article;
      const li = `<li>${title}</li>`;
      
      acc += li;

      return acc;
    }, '');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(HTTP_STATUS_CODE.SUCCESS);
    
    res.end(`<ul>${listTitles}</ul>`);
  });
}

const onClientConnect = (req, res) => {
  switch (req.url) {
    case '/':
      getList(res);
      break;
    default:
      res.writeHead(HTTP_STATUS_CODE.NOT_FOUND);
      res.end('Not found');
  } 
}

const httpServer = http.createServer(onClientConnect);

module.exports = {
  name: '--server',
  run(args) {
    const [port] = args;

    httpServer.listen(port || DEFAULT_PORT, () => {
      console.log(chalk.green(`Сервер запущен на порту ${port || DEFAULT_PORT}`));
    });

    httpServer.on('error', (message) => {
      console.error(chalk.red(message));
    });
  }
}