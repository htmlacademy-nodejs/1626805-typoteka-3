'use strict';

const {getRandomId, getRandomNumber} = require(`../../../helpers`);
const {MocksConfig} = require(`../../../common/enums`);
const {INCREASE_COUNT_FOR_IDX} = require(`../../../common/constants`);

const generateInsertSql = (tableName, rows) => {
  const comment = `/* ${tableName} */ `;
  const insert = `INSERT INTO ${tableName} VALUES`;
  const sqlRows = `  ${rows.join(`,\n  `)};`;

  return [comment, insert, sqlRows].join(`\n`).trim();
};

const generateInsertSqlRow = (rowPayload) => {
  return `(DEFAULT, ${rowPayload})`;
};

const joinSqlCommands = (...sqlCommands) => {
  return sqlCommands.join(`\n\n`).trim();
};

const generateCategoriesSqlRows = ({categories}) => {
  return categories.map((category) => generateInsertSqlRow(`'${category}'`));
};

const generateUsersSqlRows = ({users}) => {
  return users.map((user) => {
    const [firstName, lastName, email] = user.split(` `);
    const password = getRandomId();
    const image = `avatar-${getRandomNumber(
        MocksConfig.USER_PICTURE.NUMBER.MIN,
        MocksConfig.USER_PICTURE.NUMBER.MAX
    )}.jpg`;

    return generateInsertSqlRow(
        `'${firstName}', '${lastName}', '${email}', '${password}', '${image}'`
    );
  });
};

const generateCommentsSqlRows = ({users}, mockedPublications) => {
  return mockedPublications.reduce((acc, publication, idx) => {
    const commentsSqls = publication.comments.map((comment) => {
      const createdDate = new Date().toISOString();
      const userId = getRandomNumber(INCREASE_COUNT_FOR_IDX, users.length);
      const publicationIdx = idx + INCREASE_COUNT_FOR_IDX;

      return generateInsertSqlRow(
          `'${createdDate}', '${comment.text}', ${userId}, ${publicationIdx}`
      );
    });

    return [...acc, ...commentsSqls];
  }, []);
};

const generateArticlesSqlRows = ({users}, mockedPublications) => {
  return mockedPublications.map((article) => {
    const createdDate = article.createdDate.toISOString();
    const userId = getRandomNumber(INCREASE_COUNT_FOR_IDX, users.length);

    return generateInsertSqlRow(
        `'${article.title}', '${createdDate}', '${article.announce}', '${article.fullText}', '${article.image}', ${userId}`
    );
  });
};

const generateArticlesCategoriesRows = ({categories}, mockedPublications) => {
  return mockedPublications.reduce((acc, publication, idx) => {
    const publicationCategorySql = publication.category.map((category) => {
      const currentCategoryIdx = categories.findIndex((it) => it === category);
      const publicationId = idx + INCREASE_COUNT_FOR_IDX;
      const categoryId = currentCategoryIdx + INCREASE_COUNT_FOR_IDX;

      return `(${publicationId}, ${categoryId})`;
    });

    return [...acc, ...publicationCategorySql];
  }, []);
};

module.exports = {
  generateInsertSql,
  generateInsertSqlRow,
  joinSqlCommands,
  generateCategoriesSqlRows,
  generateUsersSqlRows,
  generateCommentsSqlRows,
  generateArticlesSqlRows,
  generateArticlesCategoriesRows,
};
