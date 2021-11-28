'use strict';

const {Router} = require(`express`);
const path = require(`path`);
const fs = require(`fs`);
const myRoute = new Router();

myRoute.get(`/`, (req, res) => {
  const pathToFile = path.join(__dirname, `../../..`, `mock.json`);

  fs.readFile(pathToFile, `utf8`, (err, data) => {
    if (err) {
      res.end(`File not found`);
    }

    res.json(data || []);
  });
});

module.exports = myRoute;
