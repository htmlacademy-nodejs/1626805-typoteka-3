'use strict';

const Alias = require(`../models/alias`);

class CommentService {
  constructor(sequelize) {
    this._Publication = sequelize.models.Publication;
    this._Comment = sequelize.models.Comment;
    this._User = sequelize.models.User;
  }

  async create(publicationId, comment) {
    return this._Comment.create({
      publicationId,
      ...comment
    });
  }

  async drop(id) {
    const deletedRows = this._Comment.destroy({
      where: {id}
    });
    return !!deletedRows;
  }

  findAll(publicationId) {
    return this._Comment.findAll({
      where: {publicationId},
      include: [
        {
          model: this._User,
          as: Alias.USERS,
          attributes: {
            exclude: [`passwordHash`]
          }
        }
      ],
      raw: true
    });
  }
}


module.exports = CommentService;
