'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Category extends Model {}

const define = (sequelize) => Category.init({
  name: {
    name: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: `Category`,
  tableName: `categories`
});

module.exports = define;

