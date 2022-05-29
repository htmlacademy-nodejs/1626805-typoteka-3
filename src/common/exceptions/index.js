'use strict';

class HttpError extends Error {
  constructor({status, messages}) {
    super(messages.join(`. `));
    this.status = status;
    this.messages = messages;
  }
}

module.exports = {
  HttpError,
};
