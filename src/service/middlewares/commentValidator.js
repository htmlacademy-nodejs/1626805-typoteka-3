'use strict';

const {HTTP_STATUS_CODE} = require(`../../constants`);

module.exports = (req, res, next) => {
  console.log(`commentValidator`);

  // Текст комментария. Обязательно для заполнения. Минимум 20 символов.
  const {comment} = req.body;

  if (!comment || comment.length < 20) {
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(`Bad request`);
  }

  next();
};
