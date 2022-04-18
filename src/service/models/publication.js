'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Publication extends Model {}

const define = (sequelize) => Publication.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  announcement: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  picture: {type: DataTypes.STRING}
}, {
  sequelize,
  modelName: `Publication`,
  tableName: `publications`,
  createdAt: true
});

module.exports = define;

