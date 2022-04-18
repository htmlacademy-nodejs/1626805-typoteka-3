'use strict';

const {Router} = require(`express`);
const categoryRouter = new Router();
const api = require(`../../api`).getAPI();

categoryRouter.get(`/:categoryId`, async (req, res) => {
  const {categoryId} = req.params;
  const [publications, categories] = await Promise.all([
    await api.getPublications({}),
    await api.getCategories()
  ]);

  const publicationsByCategoryId = publications.filter((publication) => (
    publication.categories.some((category) => category.id === +categoryId)
  ));

  return res.render(`pages/main`, {
    previews: publicationsByCategoryId,
    themes: categories,
    title: `Типотека`,
    hiddenTitle: ` Главная страница личного блога Типотека`,
    description: `Это приветственный текст, который владелец блога может выбрать, чтобы описать себя 👏`,
    account: null,
    hasContent: true,
    hasHot: true,
    hasLastComments: true,
    activeCategoryId: categoryId
  });
});

module.exports = categoryRouter;
