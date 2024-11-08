'use strict';
const {Model,Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');


const user = sequelize.define('user',
  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'username cannot be null',
      },
      notEmpty:{
        msg: 'username cannot be empty',
      },
    },
  },
  phone: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.STRING,
    unique : true,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Phone number cannot be null',
      },
      notEmpty:{
        msg: 'Phone number cannot be empty',
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set(value) {
      const hashPassword = bcrypt.hashSync(value,10);
      this.setDataValue('password',hashPassword);
    },
    validate: {
      notNull: {
        msg: 'Password cannot be null',
      },
      notEmpty:{
        msg: 'Password cannot be empty',
      },
    },
  },
  courseID: {
    type : Sequelize.INTEGER,
    references : {
      model : 'course',
      key : 'id',
    }
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  deletedAt: {
    type: Sequelize.DATE,
  },
}, 
{
  paranoid : true,
  freezeTableName:true,
  modelName : 'user',
});


module.exports = user;