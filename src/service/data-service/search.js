'use strict';

const {Op} = require(`sequelize`);
const Alias = require(`../models/alias`);

class SearchService {
  constructor(sequelize) {
    this._Publication = sequelize.models.Publication;
  }

  async findAll(searchText) {
    const publications = await this._Publication.findAll({
      where: {
        title: {
          [Op.substring]: searchText
        }
      },
      include: [Alias.CATEGORIES],
      order: [
        [`createdAt`, `DESC`]
      ]
    });
    return publications.map((publication) => publication.get());
  }
}

module.exports = SearchService;
