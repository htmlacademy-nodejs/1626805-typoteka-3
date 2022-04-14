'use strict';

const {DataTypes, Model} = require(`sequelize`);

class User extends Model {}

const define = (sequelize) => User.init({
  firstName: {
    name: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    name: DataTypes.STRING,
    allowNull: false
  },
  email: {
    name: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    name: DataTypes.STRING,
  },
  passwordHash: {
    name: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: `User`,
  tableName: `users`
});

module.exports = define;
