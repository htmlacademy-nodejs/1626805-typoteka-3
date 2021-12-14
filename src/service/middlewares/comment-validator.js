'use strict';

const {HTTP_STATUS_CODE, VALIDATION} = require(`../../constants`);

module.exports = (req, res, next) => {
  // Текст комментария. Обязательно для заполнения. Минимум 20 символов.
  const {comment} = req.body;

  if (!comment || comment.length < VALIDATION.MIN_COMMENT_LENGTH) {
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).send(`Bad request`);
  }

  next();
};
