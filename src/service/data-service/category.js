'use strict';

const categoryService = (data) => {
  let articles = data;

  return {
    findAll() {
      const categories = articles.reduce((acc, atricle) => {
        acc.add(...atricle.category);

        return acc;
      }, new Set());

      return categories;
    }
  };
};

module.exports = categoryService;
