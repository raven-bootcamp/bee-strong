const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class CourseTag extends Model {}

CourseTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id",
      },
    },
    course_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "course",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "course_tag",
  }
);

module.exports = CourseTag;
