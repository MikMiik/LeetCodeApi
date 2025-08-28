"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProblemTag extends Model {
    static associate(models) {
      // Nối nhiều-nhiều, không cần khai báo thêm
    }
  }
  ProblemTag.init(
    {
      problemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "problems",
          key: "id",
        },
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tags",
          key: "id",
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ProblemTag",
      tableName: "problem_tag",
      timestamps: true,
      paranoid: false,
    }
  );
  return ProblemTag;
};
