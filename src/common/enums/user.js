'use strict';

const CreatedUserPayloadKey = {
  EMAIL: `email`,
  PASSWORD: `password`,
  REPEATED_PASSWORD: `repeatedPassword`,
  FIRST_NAME: `firstName`,
  LAST_NAME: `lastName`,
  AVATAR: `avatar`
};

const UserKey = {
  ID: `id`,
  EMAIL: `email`,
  PASSWORD: `password`,
  FIRST_NAME: `firstName`,
  LAST_NAME: `lastName`,
  AVATAR: `avatar`,
  IS_ADMIN: `isAdmin`,
  CREATED_AT: `createdAt`,
  UPDATED_AT: `updatedAt`
};

const UserLoginPayloadKey = {
  EMAIL: `email`,
  PASSWORD: `password`
};

const UserLoginValidationMessage = {
  EMAIL_REQUIRE: `Электронная почта обязательное поле`,
  EMAIL_WRONG: `Неправильный email`,
  PASSWORD_REQUIRE: `Пароль обязательно поле`,
  PASSWORD_WRONG: `Неправельный пароль`
};

module.exports = {
  CreatedUserPayloadKey,
  UserKey,
  UserLoginPayloadKey,
  UserLoginValidationMessage
};
