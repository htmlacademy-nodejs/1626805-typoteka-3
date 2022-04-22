'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();
const api = require(`../../api`).getAPI();

mainRouter.get(`/`, async (_, res) => {
  const [publications, catagories] = await Promise.all([
    api.getPublications({comments: true}),
    api.getCategories(),
  ]);

  const publicationsWithPicture = publications.map((publication) => {
    return {
      ...publication,
      picture: publication.picture || `sea-fullsize@1x.jpg`
    };
  });

  return res.render(`pages/main`, {
    previews: publicationsWithPicture,
    themes: catagories,
    title: `Типотека`,
    hiddenTitle: ` Главная страница личного блога Типотека`,
    description: `Это приветственный текст, который владелец блога может выбрать, чтобы описать себя 👏`,
    account: null,
    hasContent: true,
    hasHot: true,
    hasLastComments: true,
  });
});

mainRouter.get(`/register`, (_, res) => {
  return res.render(`pages/register`, {
    title: `Типотека`,
    error: {
      email: false,
      password: false,
    },
  });
});

mainRouter.get(`/login`, (_, res) => {
  return res.render(`pages/login`, {
    title: `Типотека`,
    error: {
      email: false,
      password: false,
    },
  });
});

mainRouter.get(`/search`, async (req, res) => {
  const {search = ``} = req.query;
  let results = [];

  try {
    results = await api.search(search);
  } catch (e) {
    results = [];
  }

  return res.render(`pages/search`, {
    results,
    searchValue: search,
    title: `Типотека`,
    hiddenTitle: ` Страница поиска личного блога Типотека`,
    account: null
  });
});

module.exports = mainRouter;
