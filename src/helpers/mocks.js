'use strict';

const {getRandomNumber} = require(`./number`);
const {getRandomItem, getRandomItems} = require(`./array`);
const {logger, paintMessage} = require(`./string`);
const {readFile} = require(`./fs`);
const {CommentKey, MocksConfig, ArticleKey, MessageColor} = require(`../common/enums`);

const dataPaths = [
  MocksConfig.TITLE.FILE_PATH,
  MocksConfig.TEXT.FILE_PATH,
  MocksConfig.CATEGORY.FILE_PATH,
  MocksConfig.COMMENTS.FILE_PATH,
  MocksConfig.USERS.FILE_PATH,
];

const generateMockedComment = ({comments}) => ({
  [CommentKey.TEXT]: getRandomItems(
      comments,
      getRandomNumber(
          MocksConfig.COMMENTS.MIN_SENTENCES_COUNT,
          MocksConfig.COMMENTS.MAX_SENTENCES_COUNT
      )
  ).join(` `),
});

const generateMockedComments = ({count, comments}) => {
  const mockedComments = Array.from(new Array(count), () =>
    generateMockedComment({comments})
  );

  return mockedComments;
};

const MONTH_MILLISECONDS = 2592000000;

const generatePublication = ({titles, descriptions, categories, comments}) => ({
  [ArticleKey.TITLE]: getRandomItem(titles),
  [ArticleKey.CREATED_DATE]: new Date(
      Date.now() -
      getRandomNumber(
          MocksConfig.DATE.MIN_MONTHS_BREAK,
          MONTH_MILLISECONDS * MocksConfig.DATE.MAX_MONTHS_BREAK
      )
  ),
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
          descriptions.length
      )
  ).join(` `),
  [ArticleKey.IMAGE]: `${getRandomItem(MocksConfig.IMAGES)}.jpg`,
  [ArticleKey.CATEGORIES]: getRandomItems(
      categories,
      getRandomNumber(
          MocksConfig.CATEGORY.MIN_COUNT,
          MocksConfig.CATEGORY.MAX_COUNT
      )
  ),
  [ArticleKey.COMMENTS]: generateMockedComments({
    count: getRandomNumber(
        MocksConfig.COMMENTS.MIN_COUNT,
        MocksConfig.COMMENTS.MAX_COUNT
    ),
    comments
  }),
});

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

const getMockedPublicationsData = async () => {
  const [titles, descriptions, categories, comments, users] = await Promise.all(
      dataPaths.map((path) => readPublicationsFileContent(path))
  );

  return {
    titles,
    descriptions,
    categories,
    comments,
    users,
  };
};

const generatePublications = ({
  count,
  titles,
  descriptions,
  categories,
  comments,
}) => {
  const generatedPublications = Array.from(new Array(count), () =>
    generatePublication({
      titles,
      descriptions,
      categories,
      comments,
    })
  );

  return generatedPublications;
};

module.exports = {
  generateMockedComment,
  generateMockedComments,
  generatePublication,
  generatePublications,
  getMockedPublicationsData,
  readPublicationsFileContent,
};
