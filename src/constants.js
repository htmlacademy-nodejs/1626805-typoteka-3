'use strict';

exports.DEFAULT_PORT = 3000;

exports.API_PREFIX = `/api`;

exports.USER_ARGV_INDEX = 2;

exports.DEFAULT_COMMAND = `--version`;

exports.MAX_ID_LENGTH = 5;

exports.ExitCode = {
  success: 0,
  error: 1
};

exports.HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CCONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};
