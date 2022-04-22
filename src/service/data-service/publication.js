'use strict';

const Alias = require(`../models/alias`);

class PublicationService {
  constructor(sequelize) {
    this._Publication = sequelize.models.Publication;
    this._Category = sequelize.models.Category;
  }

  async findAll(needComments) {
    const include = [Alias.CATEGORIES];

    if (needComments) {
      include.push(Alias.COMMENTS);
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
    return this._Publication.findByPk(id, {include: [Alias.CATEGORIES]});
  }

  async create(publicationData) {
    const {category} = publicationData;

    const categoryModels = await this._Category.bulkCreate(
        category.map((item) => ({name: item}))
    );

    publicationData.category = categoryModels;

    const publication = await this._Publication.create(publicationData);
    await publication.addCategories(publicationData.category);
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

  async findPage({limit, offset}) {
    const {count, rows} = await this._Publication.findAndCountAll({
      limit,
      offset,
      include: [Alias.CATEGORIES],
      order: [
        [`createdAt`, `DESC`]
      ],
      distinct: true
    });

    return {count, publications: rows};
  }
}

module.exports = PublicationService;
