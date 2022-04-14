'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Publication extends Model {}

const define = (sequelize) => Publication.init({
  title: {
    name: DataTypes.STRING,
    allowNull: false
  },
  announcement: {
    name: DataTypes.STRING,
    allowNull: false
  },
  text: {
    name: DataTypes.STRING,
    allowNull: false
  },
  picture: {name: DataTypes.STRING}
}, {
  sequelize,
  modelName: `Publication`,
  tableName: `publications`,
  createdAt: true
});

module.exports = define;

