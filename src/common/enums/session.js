'use strict';

const SessionExpiration = {
  PERIOD: 180000,
  CHECK: 60000
};

const SessionKey = {
  SID: `sid`,
  EXPIRES: `expires`,
  DATA: `data`,
  CREATED_AT: `createdAt`,
  UPDATED_AT: `updatedAt`
};

module.exports = {
  SessionExpiration,
  SessionKey
};
