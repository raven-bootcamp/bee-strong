const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class CourseStudent extends Model {}

CourseStudent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "student",
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
    modelName: "course_student",
  }
);

module.exports = CourseStudent;
