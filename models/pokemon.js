'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pokemon.init({
    name: DataTypes.STRING,
    health: DataTypes.INTEGER,
    image: DataTypes.STRING,
    type: DataTypes.STRING,
    attackone: DataTypes.STRING,
    attacktwo: DataTypes.STRING,
    attackonecost: DataTypes.INTEGER,
    attacktwocost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pokemon',
    tableName: 'pokemoncards',
    timestamps: false,
  });
  return Pokemon;
};