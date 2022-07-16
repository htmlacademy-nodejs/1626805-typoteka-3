'use strict';

const {DataTypes} = require(`sequelize`);
const {TableName, ModelName, UserKey} = require(`../../common/enums`);

module.exports = (sequelize) => {
  return sequelize.define(
      ModelName.USER,
      {
        [UserKey.ID]: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        [UserKey.EMAIL]: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        [UserKey.PASSWORD]: {
          type: DataTypes.STRING,
          allowNull: false
        },
        [UserKey.FIRST_NAME]: {
          type: DataTypes.STRING,
          allowNull: false
        },
        [UserKey.LAST_NAME]: {
          type: DataTypes.STRING,
          allowNull: false
        },
        [UserKey.AVATAR]: {
          type: DataTypes.STRING,
          allowNull: false
        },
        [UserKey.IS_ADMIN]: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      },
      {
        tableName: TableName.USERS,
        hooks: {
          async beforeSave(user) {
            const allUsers = await this.findAll();
            const hasUsers = Boolean(allUsers.length);

            if (!hasUsers) {
              user.isAdmin = true;
            }
          }
        }
      }
  );
};
