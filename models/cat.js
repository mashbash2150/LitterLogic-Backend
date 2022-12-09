'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cat.belongsTo(models.User, {
        as: 'owner',
        foreignKey: 'id'
      })
      Cat.hasMany(models.Trigger,{
        as:'events',
        foreignKey:'id'
       })
    }
  }
  Cat.init({
    owner_id:{
      type:DataTypes.INTEGER,
      onDelete:'CASCADE',
      references:{
        model:'users',
        key:'id'
      }
    },
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    healthConditions: DataTypes.ARRAY(DataTypes.STRING),
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cat',
    tableName: 'cats'
  });
  return Cat;
};