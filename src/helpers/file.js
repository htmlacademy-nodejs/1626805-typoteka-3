'use strict';

const FILE_EXTENSION_SEPARATOR = `.`;

const getFileExtension = (fileName) => {
  return fileName.split(FILE_EXTENSION_SEPARATOR).pop();
};

module.exports = {
  getFileExtension,
};
