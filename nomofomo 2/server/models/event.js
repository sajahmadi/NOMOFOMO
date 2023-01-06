"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "initiator_email",
      });
      this.hasMany(models.Collaborator, {
        foreignKey: "event_id",
      });
      this.hasMany(models.Flight, {
        foreignKey: "event_id",
      });
      this.hasMany(models.Expense, {
        foreignKey: "event_id",
      });
      this.hasMany(models.Task, {
        foreignKey: "event_id",
      });
    }
  }
  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      initiator_email: DataTypes.STRING,
      name: DataTypes.STRING,
      date: DataTypes.DATE,
      location: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Event",
      underscored: true,
    }
  );
  return Event;
};
