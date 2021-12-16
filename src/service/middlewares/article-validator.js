'use strict';

const {HTTP_STATUS_CODE, VALIDATION} = require(`../../constants`);

module.exports = (req, res, next) => {
  // title Обязательное поле - Минимум 30 символов. Максимум 250;
  // сategory Обязательное поле - Минимум одна
  // announce Обязательное поле - Минимум 30 символов. Максимум 250;
  // fullText Необязательное поле. Максимум 1000 символов.
  const {title, announce, fullText, category} = req.body;

  if (!title || title.length < VALIDATION.MIN_TITLE_LENGTH || title.length > VALIDATION.MAX_TITLE_LENGTH) {
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(`Bad request`);
  }

  if (!category || !category.length) {
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(`Bad request`);
  }

  if (!announce || announce.length < VALIDATION.MIN_ANNOUNCE_LENGTH || announce.length > VALIDATION.MAX_ANNOUNCE_LENGTH) {
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(`Bad request`);
  }

  if (fullText && fullText.length > VALIDATION.MAX_FILL_TEXT_LENGTH) {
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(`Bad request`);
  }

  next();
};
