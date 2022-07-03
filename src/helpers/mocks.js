'use strict';

const bcrypt = require(`bcrypt`);
const {
  ArticleCategoryKey,
  CategoryKey,
  CommentKey,
  MocksConfig,
  UserKey,
  ArticleKey,
  MessageColor
} = require(`../common/enums`);
const {
  USER_PASSWORD_SALT_ROUNDS,
  INCREASE_COUNT_FOR_IDX
} = require(`../common/constants`);
const {getRandomItem, getRandomItems} = require(`./array`);
const {getRandomNumber} = require(`./number`);
const {readFile} = require(`../helpers/fs`);
const {logger} = require(`./log`);
const {paintMessage} = require(`./string`);

const DEFAULT_USER_PASSWORD = `123456`;
const ADMIN_IDX = 0;
const MONTH_MILLISECONDS = 2592000000;

const dataPaths = [
  MocksConfig.TITLE.FILE_PATH,
  MocksConfig.TEXT.FILE_PATH,
  MocksConfig.CATEGORY.FILE_PATH,
  MocksConfig.COMMENTS.FILE_PATH,
  MocksConfig.USERS.FILE_PATH,
];

const generateMockedComment = ({comments, users, articleId}) => ({
  [CommentKey.TEXT]: getRandomItems(
      comments,
      getRandomNumber(
          MocksConfig.COMMENTS.MIN_SENTENCES_COUNT,
          MocksConfig.COMMENTS.MAX_SENTENCES_COUNT
      )
  ).join(` `),
  [CommentKey.USER_ID]: getRandomNumber(
      MocksConfig.COMMENTS.MIN_USERS_COUNT,
      users.length
  ),
  [CommentKey.ARTICLE_ID]: articleId
});

const generateMockedComments = ({count, comments, users, articleId}) => {
  return Array.from(new Array(count), () => {
    return generateMockedComment({comments, users, articleId});
  });
};

const generatePublication = ({titles, descriptions}) => ({
  [ArticleKey.TITLE]: getRandomItem(titles),
  [ArticleKey.CREATED_DATE]: new Date(
      Date.now() -
      getRandomNumber(
          MocksConfig.DATE.MIN_MONTHS_BREAK,
          MONTH_MILLISECONDS * MocksConfig.DATE.MAX_MONTHS_BREAK
      )
  ).toISOString(),
  [ArticleKey.ANNOUNCE]: getRandomItems(
      descriptions,
      getRandomNumber(
          MocksConfig.TEXT.MIN_ANNOUNCE_COUNT,
          MocksConfig.TEXT.MAX_ANNOUNCE_COUNT
      )
  ).join(` `),
  [ArticleKey.FULL_TEXT]: getRandomItems(
      descriptions,
      getRandomNumber(
          MocksConfig.TEXT.MIN_FULL_TEXT_COUNT,
          MocksConfig.TEXT.MAX_FULL_TEXT_COUNT
      )
  ).join(` `),
  [ArticleKey.IMAGE]: `${getRandomItem(MocksConfig.IMAGES)}.jpg`,
});

const generatePublications = ({count, titles, descriptions}) => {
  return Array.from(
      new Array(count),
      () => {
        return generatePublication({
          titles,
          descriptions
        });
      });
};

const generateMockedUser = async (userPayload, idx) => {
  const [firstName, lastName, email] = userPayload.split(` `);
  const avatar = `avatar-${getRandomNumber(
      MocksConfig.USER_PICTURE.NUMBER.MIN,
      MocksConfig.USER_PICTURE.NUMBER.MAX
  )}.png`;
  const isAdmin = idx === ADMIN_IDX;
  const password = await bcrypt.hash(DEFAULT_USER_PASSWORD, USER_PASSWORD_SALT_ROUNDS);

  return {
    [UserKey.EMAIL]: email,
    [UserKey.FIRST_NAME]: firstName,
    [UserKey.LAST_NAME]: lastName,
    [UserKey.AVATAR]: avatar,
    [UserKey.IS_ADMIN]: isAdmin,
    [UserKey.PASSWORD]: password,
  };
};

const generateMockedUsers = (usersPayloads) => {
  return Promise.all(usersPayloads.map(generateMockedUser));
};

const generateMockedCategories = (categoriesPayloads) => {
  return categoriesPayloads.map((category) => ({[CategoryKey.NAME]: category}));
};

const generateMockedArticlesCategories = ({articleId, categories, count}) => {
  const categoryIds = categories.map((_, idx) => idx + INCREASE_COUNT_FOR_IDX);
  const randomCategories = getRandomItems(categoryIds, count);

  return randomCategories.map((categoryId) => ({
    [ArticleCategoryKey.ARTICLE_ID]: articleId,
    [ArticleCategoryKey.CATEGORY_ID]: categoryId
  }));
};

const getMockedData = async () => {
  const [
    titles,
    descriptions,
    categories,
    comments,
    users
  ] = await Promise.all(dataPaths.map((path) => {
    return readPublicationsFileContent(path);
  }));

  return {
    titles,
    descriptions,
    categories,
    comments,
    users
  };
};

const readPublicationsFileContent = async (path) => {
  try {
    const content = await readFile(path);

    return content.trim().split(`\n`);
  } catch (err) {
    logger.error(
        paintMessage(
            `An error occurred on reading mocked-data: can't read mocked-data from file...`,
            MessageColor.RED
        )
    );

    return [];
  }
};

const generateMocks = async ({articlesCount}) => {
  const {
    users,
    categories,
    titles,
    descriptions,
    comments
  } = await getMockedData();

  const mockedUsers = await generateMockedUsers(users);
  const mockedCategories = generateMockedCategories(categories);
  const mockedArticles = generatePublications({
    titles,
    descriptions,
    count: articlesCount
  });

  const mockedComments = Array.from(
      new Array(articlesCount),
      (_, idx) => {
        const articleId = idx + INCREASE_COUNT_FOR_IDX;

        return generateMockedComments({
          users,
          comments,
          articleId,
          count: getRandomNumber(
              MocksConfig.COMMENTS.MIN_COUNT,
              MocksConfig.COMMENTS.MAX_COUNT
          ),
        });
      }
  ).flat();

  const mockedArticlesCategories = Array.from(
      new Array(articlesCount),
      (_, idx) => {
        const articleId = idx + INCREASE_COUNT_FOR_IDX;

        return generateMockedArticlesCategories({
          articleId,
          categories,
          count: getRandomNumber(
              MocksConfig.CATEGORY.MIN_COUNT,
              MocksConfig.CATEGORY.MAX_COUNT
          )
        });
      }
  ).flat();

  return {
    users: mockedUsers,
    categories: mockedCategories,
    articles: mockedArticles,
    comments: mockedComments,
    articlesCategories: mockedArticlesCategories
  };
};

module.exports = {
  generateMockedComment,
  generateMockedComments,
  generatePublication,
  generatePublications,
  generateMockedUser,
  generateMockedUsers,
  generateMockedCategories,
  generateMockedArticlesCategories,
  getMockedData,
  readPublicationsFileContent,
  generateMocks
};
