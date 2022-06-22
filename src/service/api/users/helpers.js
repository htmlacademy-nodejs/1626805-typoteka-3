'use strict';

const bcrypt = require(`bcrypt`);
const {USER_PASSWORD_SALT_ROUNDS} = require(`../../../common/constants`);

const mapCreatedUser = async (userRegisterPayload) => {
  const password = await bcrypt.hash(
      userRegisterPayload.password,
      USER_PASSWORD_SALT_ROUNDS
  );

  const copiedUserPayload = {
    ...userRegisterPayload,
    password,
  };

  delete copiedUserPayload.repeatedPassword;

  return copiedUserPayload;
};

const checkIsPasswordSame = (user, password) => {
  return bcrypt.compare(password, user.password);
};

module.exports = {
  mapCreatedUser,
  checkIsPasswordSame,
};
