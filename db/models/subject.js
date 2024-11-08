'use strict';
const {Model,Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const chapter = require('./chapter');

const subject = sequelize.define('subject',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  courseNameID : {
    type: DataTypes.INTEGER,
    allowNull:true,
    references : {
      model : 'course',
      key: 'id',
    }
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'subject cannot be null',
      },
      notEmpty:{
        msg: 'subject cannot be empty',
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
  modelName : 'subject',
});


subject.hasMany(chapter,{foreignKey :'subjectID'});
chapter.belongsTo(subject,{
  foreignKey: 'subjectID',
});


module.exports = subject
