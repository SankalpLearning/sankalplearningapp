'use strict';
const {Model,Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const subject = require('./subject');
const user = require('./user');
const chapter = require('./chapter');

const course = sequelize.define('course',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  course: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'course cannot be null',
      },
      notEmpty:{
        msg: 'course cannot be empty',
      },
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }, 
  deletedAt: {
    type: Sequelize.DATE,
  },
},
{
  paranoid : true,
  freezeTableName:true,
  modelName : 'course',
});

course.hasMany(subject,{foreignKey:'courseNameID'});
subject.belongsTo(course,{
  foreignKey:'courseNameID',
});

course.hasMany(user,{foreignKey:'courseID'});
user.belongsTo(course,{
  foreignKey:'courseID',
});


module.exports = course;
