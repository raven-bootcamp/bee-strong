const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Instructor extends Model {}

Instructor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    instructor_name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "instructor",
  }
);

module.exports = Instructor;
