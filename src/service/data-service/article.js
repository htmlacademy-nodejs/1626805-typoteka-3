'use strict';
const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);
const {formateDate} = require(`../../utils`);

// TODO описать то что возвращают методы
const articleService = (data) => {
  console.log(`dataServiceArticle`);
  let articles = data;

  return {
    findAll() {
      console.log(` - findAll`);
      return articles;
    },

    findOne(articleId) {
      const founedArticle = articles.find((article) => {
        return articleId === article.id;
      });

      return founedArticle || null;
    },

    create(articleData) {
      const newArticle = {
        id: nanoid(MAX_ID_LENGTH),
        createdDate: formateDate(new Date()),
        comments: [],
        ...articleData
      };

      articles.push(newArticle);

      return newArticle;
    },

    update(id, payload) {
      const targetAtricle = articles.find((article) => article.id === id);

      if (!targetAtricle) {
        return null;
      }

      return Object.assign(targetAtricle, payload);
    },

    drop(id) {
      const targetAtricle = articles.find((article) => article.id === id);

      if (!targetAtricle) {
        return null;
      }

      articles = articles.filter((article) => article.id !== id);

      return articles;
    },

    findComments(id) {
      const targetAtricle = articles.find((article) => article.id === id);

      if (!targetAtricle) {
        return null;
      }

      return targetAtricle.comments;
    },

    dropComments(articleId, commentId) {
      const targetAtricle = articles.find((article) => article.id === articleId);

      if (!targetAtricle) {
        return null;
      }

      targetAtricle.comments = targetAtricle.comments.filter((comment) => {
        return comment.id !== commentId;
      });

      return targetAtricle.comments;
    },

    createComment(id, payload) {
      const targetAtricle = articles.find((article) => article.id === id);

      if (!targetAtricle) {
        return null;
      }

      const newComment = {
        id: nanoid(MAX_ID_LENGTH),
        createdDate: formateDate(new Date()),
        ...payload
      };

      targetAtricle.comments.push(newComment);

      return newComment;
    }
  };
};

module.exports = articleService;
