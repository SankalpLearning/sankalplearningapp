'use strict';
const {Model,Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');


const subtopic = sequelize.define('subtopic', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chapterID: {
        type: Sequelize.INTEGER,
        references : {
          model : 'chapter',
          key : 'id',
        }
      },
      subtopic: {
        allowNull:false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'subtopic cannot be null',
          },
          notEmpty:{
            msg: 'subtopic cannot be empty',
          },
        },
      },
      videoid: {
        allowNull :false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'VideoID cannot be null',
          },
          notEmpty:{
            msg: 'VideoID cannot be empty',
          },
        },
      },
      kannadavideoid: {
        allowNull :false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'VideoID cannot be null',
          },
          notEmpty:{
            msg: 'VideoID cannot be empty',
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
      deletedAt : {
        type:Sequelize.DATE,
      }
    },{
      freezeTableName:true,
      paranoid:true,
      modelName:'subtopic',
    });

    
    module.exports = subtopic
