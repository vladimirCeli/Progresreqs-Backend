const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Person = require('./Person.model');

const CategoriesRequirements = sequelize.define("CategoryRequirement", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    original: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    }
  },
  {
    tableName: 'CategoryRequirement',
    timestamps: false,
    underscored: true,
    sequelize,
  }
);


  CategoriesRequirements.belongsTo(Person, {foreignKey: 'person_id'});
  
  module.exports = CategoriesRequirements;