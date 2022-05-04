'use strict';

const {Router} = require(`express`);
const {PUBLICATIONS_PER_PAGE} = require(`../../../constants`);

const mainRouter = new Router();
const api = require(`../../api`).getAPI();

mainRouter.get(`/`, async (req, res) => {
  // получаем номер страницы
  let {page = 1} = req.query;
  page = +page;

  // количество запрашиваемых объявлений равно количеству объявлений на странице
  const limit = PUBLICATIONS_PER_PAGE;

  // количество объявлений, которое нам нужно пропустить - это количество объявлений на предыдущих страницах
  const offset = (page - 1) * PUBLICATIONS_PER_PAGE;

  const [
    {count, publications},
    categories
  ] = await Promise.all([
    api.getPublications({limit, offset, comments: true}),
    api.getCategories()
  ]);

  // количество страниц — это общее количество объявлений, поделённое на количество объявлений на странице (с округлением вверх)
  const totalPages = Math.ceil(count / PUBLICATIONS_PER_PAGE);

  // передадим все эти данные в шаблон
  res.render(`pages/main`, {
    previews: publications,
    themes: categories,
    page,
    totalPages,
    title: `Типотека`,
    hiddenTitle: ` Главная страница личного блога Типотека`,
    description: `Это приветственный текст, который владелец блога может выбрать, чтобы описать себя 👏`,
    account: null,
    hasContent: true,
    hasHot: true,
    hasLastComments: true
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
