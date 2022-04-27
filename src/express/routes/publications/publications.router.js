'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);

const publicationRouter = new Router();
const api = require(`../../api`).getAPI();
const storage = require(`../../disk-storage`);

const upload = multer({storage});

publicationRouter.get(`/add`, async (_, res) => {
  const categories = await api.getCategories();

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
  const [publication, comments] = await Promise.all([
    api.getPublication(id),
    api.getComments(id)
  ]);

  const categories = publication.categories;

  return res.render(`pages/publications/publication`, {
    comments,
    publication: {
      image: {
        fileName: `sea-fullsize@1x.jpg`,
        alt: `пейзаж море, скалы, пляж`,
      },
      ...publication
    },
    themes: categories,
    account: null
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
  const {title, announcement, text, category} = body;

  const newPublication = {
    picture: file ? file.filename : ``,
    title,
    announcement,
    text,
    category: Array.isArray(category) ? category : [category]
  };

  try {
    await api.createPublication(newPublication);
    res.redirect(`/my`);
  } catch (e) {
    res.redirect(`back`);
  }
});

publicationRouter.post(`/edit/:id`, upload.single(`avatar`), async (req, res) => {
  const {id} = req.params;
  const {body, file} = req;
  const {title, announcement, text, category} = body;

  const updatedPublication = {
    picture: file ? file.filename : ``,
    title,
    announcement,
    text,
    category: Array.isArray(category) ? category : [category]
  };

  try {
    await api.editPublication(id, updatedPublication);
    res.redirect(`/my`);
  } catch (e) {
    res.redirect(`back`);
  }
});

publicationRouter.post(`/delete`, async (req, res) => {
  const {body: {publicationId}} = req;

  try {
    await api.deletePublication(publicationId);
    res.redirect(`/my`);
  } catch (error) {
    console.error(error);
    res.redirect(`/my`);
  }
});

module.exports = publicationRouter;
