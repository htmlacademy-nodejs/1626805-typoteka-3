'use strict';

const {Model} = require(`sequelize`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const definePublication = require(`./publication`);
const defineRole = require(`./role`);
const defineUser = require(`./user`);
const Alias = require(`./alias`);

const define = (sequelize) => {
  class PublicationCategory extends Model {}

  PublicationCategory.init({}, {sequelize});

  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Publication = definePublication(sequelize);
  const Role = defineRole(sequelize);
  const User = defineUser(sequelize);

  // У пользователя могут быть несколько комментов
  User.hasMany(Comment, {as: Alias.COMMENTS, foreignKey: `userId`, onDelete: `cascade`});
  // У пользователя могут быть несколько публикаций
  User.hasMany(Publication, {as: Alias.PUBLICATIONS, foreignKey: `userId`, onDelete: `cascade`});
  // У пользователя может быть только одна роль
  User.hasOne(Role, {as: Alias.ROLES, foreignKey: `userId`});

  // У публикации может быть несколько комментариев
  Publication.hasMany(Comment, {as: Alias.COMMENTS, foreignKey: `publicationId`});
  // Но у публикации только один владелец - user
  Publication.belongsTo(User, {foreignKey: `userId`});

  // Но у комментария только один владелец - user
  Comment.belongsTo(User, {foreignKey: `userId`});
  Comment.belongsTo(Publication, {foreignKey: `publicationId`});

  // Роль задается только для одно пользователя
  Role.belongsTo(User, {foreignKey: `userId`});

  // Публикация может быть в разных категорях
  // Категории могут относиться к разным публикациям
  Publication.belongsToMany(Category, {through: PublicationCategory, as: Alias.CATEGORIES});
  Category.belongsToMany(Publication, {through: PublicationCategory, as: Alias.PUBLICATIONS});
  Category.hasMany(PublicationCategory, {as: Alias.PUBLICATION_CATEGORIES});

  return {
    Category,
    Comment,
    Publication,
    Role,
    User,
    PublicationCategory
  };
};

module.exports = define;
