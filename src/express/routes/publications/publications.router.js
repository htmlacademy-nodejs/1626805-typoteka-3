'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);

const publicationRouter = new Router();
const api = require(`../../api`).getAPI();
const storage = require(`../../disk-storage`);

const upload = multer({storage});

publicationRouter.get(`/add`, async (_, res) => {
  const categories = await api.getCategories();

  console.log(`categories - `, categories);

  return res.render(`pages/publications/edit`, {
    categories,
    publication: {},
    account: {
      type: `admin`,
    },
  });
});

publicationRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const [publication, categories] = await Promise.all([
    api.getPublication(id),
    api.getCategories(),
  ]);

  return res.render(`pages/publications/publication`, {
    publication: {
      image: {
        fileName: `sea-fullsize@1x.jpg`,
        alt: `пейзаж море, скалы, пляж`,
      },
      ...publication
    },
    themes: categories,
    account: {
      type: `user`,
      name: `Алёна Фролова`,
      avatar: `img/avatar-2.png`,
    },
  });
});

publicationRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [publication, categories] = await Promise.all([
    api.getPublication(id),
    api.getCategories(),
  ]);

  return res.render(`pages/publications/edit`, {
    publication,
    categories,
    account: {
      type: `admin`,
    }
  });
});

publicationRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const {createdDate, title, announce, fullText, category} = body;

  const newPublication = {
    picture: file ? file.filename : ``,
    createdDate,
    title,
    announce,
    fullText,
    category,
    comments: []
  };

  try {
    await api.createPublication(newPublication);
    res.redirect(`/my`);
  } catch (e) {
    res.redirect(`back`);
  }
});

publicationRouter.get(`/category/:id`, (_, res) => {
  return res.render(`pages/publications/categories`, {
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

module.exports = publicationRouter;
