const Sequelize = require("sequelize");
const { sequelize } = require("..");

class ToDo extends Sequelize.Model {}

ToDo.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      allowNull: false,
    },
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      defaultValue: "Title",
    },
    description: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    isDone: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isFavourite: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
    priority: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize: sequelize,
    underscored: true,
    modelName: "todo",
  }
);

module.exports = ToDo;
