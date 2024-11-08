'use strict';
const {Model,Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const subtopic = require('./subtopic');


const chapter = sequelize.define('chapter',{
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    subjectID: {
      type: Sequelize.INTEGER,
      references : {
        model:'subject',
        key : 'id',
      }
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'title cannot be null',
        },
        notEmpty:{
          msg: 'title cannot be empty',
        },
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt:{
      type:Sequelize.DATE
    }
  },
{
  paranoid : true,
  freezeTableName:true,
  modelName : 'chapter',
});

chapter.hasMany(subtopic,{foreignKey:'chapterID'});
subtopic.belongsTo(chapter,{
  foreignKey:'chapterID',
});



module.exports = chapter;
