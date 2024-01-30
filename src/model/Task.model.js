const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Requirement = require('./Requirements.model');

const Task = sequelize.define("Task", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    write_description: {
      type: DataTypes.TEXT,
    },
    cwe: {
      type: DataTypes.STRING,
    },
    nist: {
      type: DataTypes.STRING,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
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
    tableName: 'Task',
    timestamps: false,
    underscored: true,
    sequelize,
  }
);

Task.belongsTo(Requirement, {foreignKey: 'requirement_id'});

module.exports = Task;

