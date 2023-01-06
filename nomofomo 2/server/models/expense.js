"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Event, {
        foreignKey: "event_id",
      });
    }
  }
  Expense.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      collaborator_name: DataTypes.STRING,
      description: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      date: DataTypes.DATE,
      event_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Expense",
      underscored: true,
    }
  );
  return Expense;
};
