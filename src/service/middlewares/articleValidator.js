'use strict';

const {HTTP_STATUS_CODE} = require(`../../constants`);

module.exports = (req, res, next) => {
  console.log(`articleValidator`);
  // title Обязательное поле - Минимум 30 символов. Максимум 250;
  // сategory Обязательное поле - Минимум одна
  // announce Обязательное поле - Минимум 30 символов. Максимум 250;
  // fullText Необязательное поле. Максимум 1000 символов.
  const {title, announce, fullText, category} = req.body;

  if (!title || title.length < 30 || title.length > 250) {
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(`Bad request`);
  }

  if (!category.length) {
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(`Bad request`);
  }

  if (!announce || announce.length < 30 || announce.length > 250) {
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(`Bad request`);
  }

  if (fullText && fullText.length > 1000) {
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(`Bad request`);
  }

  next();
};
