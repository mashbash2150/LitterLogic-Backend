'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trigger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Trigger.belongsTo(models.Cat, {
        as: 'triggered',
        foreignKey: 'cat_id'
      })
    }
  }
  Trigger.init({
  
    enterTime: DataTypes.DATE,
    exitTime: DataTypes.DATE,
    dailyTotal:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trigger',
    tableName:'triggers'
  });
  return Trigger;
};