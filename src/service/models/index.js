'use strict';

const {Model} = require(`sequelize`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const definePublication = require(`./publication`);
const defineRole = require(`./role`);
const defineUser = require(`./user`);

const define = (sequelize) => {
  class PublicationCategory extends Model {}

  PublicationCategory.init({}, {sequelize});

  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Publication = definePublication(sequelize);
  const Role = defineRole(sequelize);
  const User = defineUser(sequelize);

  // У пользователя могут быть несколько комментов
  User.hasMany(Comment, {as: `comments`, foreignKey: `userId`, onDelete: `cascade`});
  // У пользователя могут быть несколько публикаций
  User.hasMany(Publication, {as: `publications`, foreignKey: `userId`, onDelete: `cascade`});
  // У пользователя может быть только одна роль
  User.hasOne(Role, {as: `roles`, foreignKey: `userId`});
  // У пользователя могут быть несколько публикаций
  User.belongsTo(Publication, {foreignKey: `publicationId`});

  // У публикации может быть несколько категорий
  Publication.hasMany(Category, {as: `categories`, foreignKey: `publicationId`});
  // У публикации может быть несколько комментариев
  Publication.hasMany(Comment, {as: `comments`, foreignKey: `commentId`});
  // Но у публикации только один владелец - user
  Publication.belongsTo(User, {foreignKey: `userId`});

  // Но у комментария только один владелец - user
  Comment.belongsTo(User, {foreignKey: `userId`});
  Comment.belongsTo(Publication, {foreignKey: `publicationId`});

  // Роль задается только для одно пользователя
  Role.belongsTo(User, {foreignKey: `userId`});

  // Публикация может быть в разных категорях
  // Категории могут относиться к разным публикациям
  Publication.belongsToMany(Category, {through: PublicationCategory, as: `categories`});
  Category.belongsToMany(Publication, {through: PublicationCategory, as: `publications`});
  Category.hasMany(PublicationCategory, {as: `publicationCategories`});

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
