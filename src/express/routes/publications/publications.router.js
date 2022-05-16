'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const sanitizeHtml = require(`sanitize-html`);

const publicationRouter = new Router();
const api = require(`../../api`).getAPI();
const storage = require(`../../disk-storage`);
const {prepareErrors} = require(`../../../utils`);
const {Role} = require(`../../../constants`);

const upload = multer({storage});

publicationRouter.get(`/add`, async (_, res) => {
  const categories = await api.getCategories();

  return res.render(`pages/publications/edit`, {
    categories,
    validationMessages: [],
    publication: {},
    account: {
      type: Role.ADMIN,
    },
  });
});

publicationRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;

  const [publication, comments] = await Promise.all([
    api.getPublication(id),
    api.getComments(id)
  ]);

  return res.render(`pages/publications/publication`, {
    comments,
    validationMessages: [],
    publication: {
      image: {
        fileName: `sea-fullsize@1x.jpg`,
        alt: `пейзаж море, скалы, пляж`,
      },
      ...publication
    },
    themes: publication.categories,
    account: {
      type: `user`
    },
    isPost: true
  });
});

publicationRouter.post(`/comments/add`, async (req, res) => {
  const {body} = req;
  const {comment, publicationId} = body;

  try {
    await api.addComments(publicationId, {text: sanitizeHtml(comment)});
    res.redirect(`/publications/${publicationId}`);
  } catch (error) {
    const [publication, comments] = await Promise.all([
      api.getPublication(publicationId),
      api.getComments(publicationId)
    ]);
    const validationMessages = prepareErrors(error);

    res.render(`pages/publications/publication`, {
      comments,
      validationMessages,
      publication: {
        image: {
          fileName: `sea-fullsize@1x.jpg`,
          alt: `пейзаж море, скалы, пляж`,
        },
        ...publication
      },
      themes: publication.categories,
      account: {
        type: `user`
      },
      isPost: true
    });
  }

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
    validationMessages: [],
    account: {
      type: Role.ADMIN,
    }
  });
});

publicationRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const {title, announcement, text, categories} = body;

  const newPublication = {
    picture: file ? file.filename : ``,
    title: sanitizeHtml(title),
    announcement: sanitizeHtml(announcement),
    text: sanitizeHtml(text),
    categories: Array.isArray(categories) ? categories : [categories]
  };

  try {
    await api.createPublication(newPublication);
    res.redirect(`/my`);
  } catch (error) {
    const categoryItems = await api.getCategories();
    const validationMessages = prepareErrors(error);

    res.render(`pages/publications/edit`, {
      validationMessages,
      categories: categoryItems,
      publication: {},
      account: {
        type: Role.ADMIN,
      },
    });
  }
});

publicationRouter.post(`/edit/:id`, upload.single(`avatar`), async (req, res) => {
  const {id} = req.params;
  const {body, file} = req;
  const {title, announcement, text, categories} = body;

  const updatedPublication = {
    picture: file ? file.filename : ``,
    title: sanitizeHtml(title),
    announcement: sanitizeHtml(announcement),
    text: sanitizeHtml(text),
    categories: Array.isArray(categories) ? categories : [categories]
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
