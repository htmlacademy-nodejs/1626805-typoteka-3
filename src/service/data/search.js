'use strict';

const {Op} = require(`sequelize`);
const {
  ModelAlias,
  ArticleKey,
  SortType,
} = require(`../../common/enums`);

class Search {
  constructor({articleModel, categoryModel}) {
    this._Article = articleModel;
    this._Category = categoryModel;
  }

  async findAll(titleValue) {
    const articles = await this._Article.findAll({
      where: {
        title: {
          [Op.substring]: titleValue,
        },
      },
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

    return articles.map((article) => article.get());
  }
}

module.exports = Search;
