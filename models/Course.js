const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Course extends Model {}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    course_name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
    instructor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "instructor",
        key: "id",
      },
    },
    course_link: {
      type: DataTypes.STRING(100),
    },
    start: {
      type: DataTypes.DATE,
    },
    duration: {
      type: DataTypes.STRING(60),
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "course",
  }
);

module.exports = Course;
