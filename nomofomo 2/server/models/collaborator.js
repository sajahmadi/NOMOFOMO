"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Collaborator extends Model {
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
  Collaborator.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      event_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Collaborator",
      underscored: true,
    }
  );
  return Collaborator;
};
