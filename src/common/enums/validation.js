'use strict';

const CommentValidationRule = {
  TEXT_MIN_LENGTH: 20
};

const CreatedUserValidationRule = {
  PASSWORD_MIN_LENGTH: 6
};

const ArticleValidationRule = {
  TITLE_MIN_LENGTH: 30,
  TITLE_MAX_LENGTH: 250,
  CATEGORIES_MIN_COUNT: 1,
  ANNOUNCE_MIN_LENGTH: 30,
  ANNOUNCE_MAX_LENGTH: 250,
  FULL_TEXT_MAX_LENGTH: 1000
};

const QueryValidationMessage = {
  LIMIT_NUMBER: `Limit should be a number.`,
  ORDER_EXACT_VALUE: `Order value should be correct.`
};

const ArticleValidationMessage = {
  TITLE_MIN_LENGTH: `Заголовок должен быть не меньше ${ArticleValidationRule.TITLE_MIN_LENGTH} символов`,
  TITLE_MAX_LENGTH: `Заголовок должен быть не больше ${ArticleValidationRule.TITLE_MAX_LENGTH} символов`,
  TITLE_REQUIRE: `Заголовок обязательное поле`,
  CREATED_DATE_REQUIRE: `Дата создания обязательное поле`,
  CATEGORIES_MIN_COUNT: `Статья должна иметь не меньше ${ArticleValidationRule.CATEGORIES_MIN_COUNT} категории`,
  CATEGORIES_REQUIRE: `Категория обязательное поле`,
  ANNOUNCE_MIN_LENGTH: `Анонс публикации должен быть не меньше ${ArticleValidationRule.ANNOUNCE_MIN_LENGTH} символов`,
  ANNOUNCE_MAX_LENGTH: `Анонс публикации должен быть не больше ${ArticleValidationRule.ANNOUNCE_MAX_LENGTH} символов`,
  ANNOUNCE_REQUIRE: `Анонс публикации обязательное поле`,
  FULL_TEXT_MAX_LENGTH: `Полный текст публикации должен быть не больше ${ArticleValidationRule.FULL_TEXT_MAX_LENGTH} символов`
};

const CommentValidationMessage = {
  TEXT_MIN_LENGTH: `Коментарий должен быть минимум ${CommentValidationRule.TEXT_MIN_LENGTH} символов`,
  TEXT_REQUIRE: `Коментарий обязательное поле`,
  USER_ID_REQUIRE: `Идентификатор пользователя обязательное поле`
};

const CreatedUserValidationMessage = {
  EMAIL_REQUIRE: `Электронная почта обязательное поле`,
  EMAIL_WRONG: `Неправильный email`,
  EMAIL_ALREADY_REGISTER: `Пользователь с таким email уже зарегистрирован`,
  PASSWORD_REQUIRE: `Пароль обязательно поле`,
  PASSWORD_MIN_LENGTH: `Пароль должен быть минимум ${CreatedUserValidationRule.PASSWORD_MIN_LENGTH} символов`,
  REPEATED_PASSWORD_REQUIRE: `Повторяемы пароль обязательное поле`,
  REPEATED_PASSWORD_EQUALS: `Пароли не совпадают`,
  FIRST_NAME_REQUIRE: `Имя обязательное поле`,
  FIRST_NAME_WRONG: `Имя должно быть валидным полем`,
  LAST_NAME_REQUIRE: `Фамилия обязательное поле`,
  LAST_NAME_WRONG: `Фамилия должно быть валидным полем`,
  AVATAR_REQUIRE: `Аватар обязательное поле`
};

const RouteIdValidationMessage = {
  NUMBER: `Id should be a number.`
};

const SessionValidationRule = {
  DATA_LENGTH: 500
};

const CategoryValidationRule = {
  NAME_MIN_LENGTH: 5,
  NAME_MAX_LENGTH: 40
};

const CategoryValidationMessage = {
  NAME_MIN_LENGTH: `Имя категории должен быть не меньше ${CategoryValidationRule.NAME_MIN_LENGTH} символов`,
  NAME_MAX_LENGTH: `Имя категории должен быть не больше ${CategoryValidationRule.NAME_MAX_LENGTH} символов`,
  NAME_REQUIRE: `Имя категории обязательное поле`
};

module.exports = {
  CommentValidationRule,
  CommentValidationMessage,
  ArticleValidationRule,
  ArticleValidationMessage,
  RouteIdValidationMessage,
  CreatedUserValidationRule,
  CreatedUserValidationMessage,
  SessionValidationRule,
  CategoryValidationRule,
  QueryValidationMessage,
  CategoryValidationMessage
};
