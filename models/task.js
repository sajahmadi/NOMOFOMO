"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
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
  Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: DataTypes.STRING,
      date: DataTypes.DATE,
      event_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Task",
      underscored: true,
    }
  );
  return Task;
};
