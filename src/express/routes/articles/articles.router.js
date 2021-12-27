'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);

const articleRouter = new Router();
const api = require(`../../api`).getAPI();
const storage = require(`../../disk-storage`);

const upload = multer({storage});

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

articleRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const {createdDate, title, announce, fullText, category} = body;

  const newArticle = {
    picture: file ? file.filename : ``,
    createdDate,
    title,
    announce,
    fullText,
    category,
    comments: []
  };

  try {
    await api.createArticle(newArticle);
    res.redirect(`/my`);
  } catch (e) {
    res.redirect(`back`);
  }
});

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
