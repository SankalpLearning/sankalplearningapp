'use strict';
const {Model,Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');
const AppError = require('../../utils/apierror');

module.exports = sequelize.define('userTrack', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  phone: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING,
    set(value) {
      const hashPassword = bcrypt.hashSync(value,10);
      this.setDataValue('password',hashPassword);
    },
  },
  signedout: {
    type: Sequelize.DATE
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
    type: Sequelize.DATE
  }
}, {
  paranoid: true,
  freezeTableName: true,
  modelName: 'userTrack',
}
);