'use strict';

const {Sequelize, Op} = require(`sequelize`);
const {
  ModelAlias,
  SortType,
  ArticleKey,
  CommentKey,
  ArticleCategoryKey,
} = require(`../../common/enums`);

class Articles {
  constructor({
    articleModel,
    commentModel,
    categoryModel,
    articleCategoryModel,
  }) {
    this._Article = articleModel;
    this._Comment = commentModel;
    this._Category = categoryModel;
    this._ArticleCategory = articleCategoryModel;
  }

  async findAll() {
    const articles = await this._Article.findAll({
      include: [
        ModelAlias.COMMENTS,
        {
          model: this._Category,
          as: ModelAlias.CATEGORIES,
          through: {
            attributes: [],
          },
        },
      ],
      order: [[ArticleKey.CREATED_DATE, SortType.DESC]],
    });

    return articles.map((item) => item.get());
  }

  async findPage({limit, offset}) {
    const {count, rows} = await this._Article.findAndCountAll({
      limit,
      offset,
      include: [
        ModelAlias.COMMENTS,
        {
          model: this._Category,
          as: ModelAlias.CATEGORIES,
          through: {
            attributes: [],
          },
        },
      ],
      order: [[ArticleKey.CREATED_DATE, SortType.DESC]],
      distinct: true,
    });

    return {
      count,
      articles: rows.map((item) => item.get()),
    };
  }

  async findMostCommented(limit) {
    const articles = await this._Article.findAll({
      limit,
      attributes: {
        include: [Sequelize.fn(`COUNT`, Sequelize.col(`comments.id`)), `count`],
      },
      include: {
        model: this._Comment,
        as: ModelAlias.COMMENTS,
        attributes: [],
        duplicating: false,
      },
      group: [Sequelize.col(`Article.id`)],
      having: Sequelize.where(
          Sequelize.fn(`COUNT`, Sequelize.col(`comments.id`)),
          {
            [Op.gte]: 1,
          }
      ),
      order: [[`count`, SortType.DESC]],
    });

    return articles.map((article) => article.get());
  }

  findOne(id) {
    return this._Article.findByPk(id, {
      include: [
        {
          model: this._Category,
          as: ModelAlias.CATEGORIES,
          through: {
            attributes: [],
          },
        },
        {
          model: this._Comment,
          as: ModelAlias.COMMENTS,
          include: [ModelAlias.USER],
        },
      ],
      order: [[ModelAlias.COMMENTS, CommentKey.CREATED_AT, SortType.DESC]],
    });
  }

  findByCategoryId(id) {
    return this._Article.findAll({
      include: [
        ModelAlias.COMMENTS,
        {
          model: this._Category,
          as: ModelAlias.CATEGORIES,
          through: {
            attributes: [],
          },
        },
        {
          model: this._ArticleCategory,
          as: ModelAlias.ARTICLE_CATEGORIES,
          attributes: [],
          require: true,
          where: {
            [ArticleCategoryKey.CATEGORY_ID]: id,
          },
        },
      ],
      order: [[ArticleKey.CREATED_DATE, SortType.DESC]],
    });
  }

  async findPageByCategoryId({id, limit, offset}) {
    const {count, rows} = await this._Article.findAndCountAll({
      limit,
      offset,
      include: [
        ModelAlias.COMMENTS,
        {
          model: this._Category,
          as: ModelAlias.CATEGORIES,
          through: {
            attributes: [],
          },
        },
        {
          model: this._ArticleCategory,
          as: ModelAlias.ARTICLE_CATEGORIES,
          attributes: [],
          require: true,
          where: {
            [ArticleCategoryKey.CATEGORY_ID]: id,
          },
        },
      ],
      order: [[ArticleKey.CREATED_DATE, SortType.DESC]],
      distinct: true,
    });

    return {
      count,
      articles: rows.map((item) => item.get()),
    };
  }

  async create(createdArticle) {
    const article = await this._Article.create(createdArticle);

    await article.addCategories(createdArticle.categories);

    return article.get();
  }

  async update(article, articleId) {
    const [, updatedArticle] = await this._Article.update(article, {
      where: {
        id: articleId,
      },
      returning: true,
      plain: true
    });
    updatedArticle.setCategories(article.categories);

    return Boolean(updatedArticle);
  }

  async drop(articleId) {
    const deletedRows = await this._Article.destroy({
      where: {
        id: articleId,
      },
    });

    return Boolean(deletedRows);
  }
}

module.exports = Articles;
