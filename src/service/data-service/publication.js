'use strict';

const Aliase = require(`../models/aliase`);

class PublicationService {
  constructor(sequelize) {
    this._Publication = sequelize.models.Publication;
    this._Category = sequelize.models.Category;
  }

  async findAll(needComments) {
    const include = [Aliase.CATEGORIES];

    if (needComments) {
      include.push(Aliase.COMMENTS);
    }

    const publications = await this._Publication.findAll({
      include,
      order: [
        [`createdAt`, `DESC`]
      ]
    });
    return publications.map((publication) => publication.get());
  }

  findOne(id) {
    return this._Publication.findByPk(id, {include: [Aliase.CATEGORIES]});
  }

  async create(publicationData) {
    const publication = await this._Publication.create(publicationData);
    await publication.addCategories(publicationData.categories);
    return publication.get();
  }

  async update(id, publication) {
    const [affectedRows] = await this._Publication.update(publication, {
      where: {id}
    });
    return !!affectedRows;
  }

  async drop(id) {
    const deletedRows = await this._Publication.destroy({
      where: {id}
    });
    return !!deletedRows;
  }

}

module.exports = PublicationService;
