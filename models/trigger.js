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
    cat_id:{
      type:DataTypes.INTEGER,
      onDelete:'CASCADE',
      references:{
        model:'cats',
        key:'id'
      }
    },
    action: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Trigger',
    tableName:'triggers'
  });
  return Trigger;
};