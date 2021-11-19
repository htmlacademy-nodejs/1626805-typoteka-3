'use strict';

const {Router} = require(`express`);
const myRoute = new Router();

myRoute.get(`/`, (req, res) => res.render(`my`));
myRoute.get(`/comments`, (req, res) => res.render(`comments`));

module.exports = myRoute;
