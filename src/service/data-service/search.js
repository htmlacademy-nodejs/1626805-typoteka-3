'use strict';

const searchService = (data) => {
  let articles = data;

  return {
    search(query) {
      return articles.filter((article) => {
        const titleInLowerCase = article.title.toLowerCase();
        const queryInLowerCase = query.toLowerCase();

        return !!~titleInLowerCase.indexOf(queryInLowerCase);
      });
    }
  };
};

module.exports = searchService;
