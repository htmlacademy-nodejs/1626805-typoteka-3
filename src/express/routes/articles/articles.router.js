'use strict';

const {Router} = require(`express`);
const articleRouter = new Router();
const api = require(`../../api`).getAPI();

// DONE
articleRouter.get(`/add`, async (_, res) => {
  const categories = await api.getCategories();

  return res.render(`pages/articles/edit`, {
    categories,
    article: {},
    account: {
      type: `admin`,
    },
  });
});

// DONE
articleRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories(),
  ]);

  return res.render(`pages/articles/article`, {
    article: {
      image: {
        fileName: `sea-fullsize@1x.jpg`,
        alt: `пейзаж море, скалы, пляж`,
      },
      ...article
    },
    themes: categories,
    account: {
      type: `user`,
      name: `Алёна Фролова`,
      avatar: `img/avatar-2.png`,
    },
  });
});

// DONE
articleRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories(),
  ]);

  return res.render(`pages/articles/edit`, {
    article,
    categories,
    account: {
      type: `admin`,
    }
  });
});

// TODO: Добавить ручку для обработки формы

// DONE
articleRouter.get(`/category/:id`, (_, res) => {
  return res.render(`pages/articles/categories`, {
    title: `Типотека`,
    displayedTitle: `Бизнес`,
    description: `Это приветственный текст, который владелец блога может выбрать, чтобы описать себя 👏`,
    account: {
      type: `user`,
      name: `Алёна Фролова`,
      avatar: `img/avatar-2.png`,
    },
    hasContent: true,
    hasHot: true,
    hasLastComments: true,
  });
});



module.exports = articleRouter;
