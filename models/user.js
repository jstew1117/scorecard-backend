'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.score, {
        foreignKey: {
          name:"user_id"
        }
      })
    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    user_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};