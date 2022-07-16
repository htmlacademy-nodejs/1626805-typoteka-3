'use strict';

const {ModelName, TableName} = require(`../../common/enums`);

module.exports = (sequelize) => {
  return sequelize.define(
      ModelName.ARTICLE_CATEGORY,
      {},
      {
        tableName: TableName.ARTICLES_CATEGORIES
      }
  );
};
