"use strict";

const { Model } = require("sequelize");
const { default: slugify } = require("slugify");

module.exports = (sequelize, DataTypes) => {
  class Problem extends Model {
    static associate(models) {
      Problem.belongsToMany(models.Tag, {
        through: models.ProblemTag,
        foreignKey: "problemId",
        otherKey: "tagId",
        as: "tags",
      });
    }
  }
  Problem.init(
    {
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.ENUM("easy", "medium", "hard"),
        allowNull: false,
      },
      testCases: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      template: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Problem",
      tableName: "problems",
      timestamps: true,
      paranoid: true,
    }
  );

  // Auto-generate slug if not provided
  Problem.addHook("beforeValidate", async (problem, options) => {
    if (!problem.slug && problem.title) {
      let baseSlug = slugify(problem.title, { lower: true, strict: true });
      let slug = baseSlug;
      let counter = 1;
      while (await Problem.findOne({ where: { slug }, hooks: false })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      problem.slug = slug;
    }
  });

  return Problem;
};
