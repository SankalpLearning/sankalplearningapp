'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subtopic', {
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
        type: Sequelize.STRING
      },
      videoid: {
        allowNull :false,
        type: Sequelize.STRING
      },
      kannadavideoid: {
        allowNull :false,
        type: Sequelize.STRING
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('subtopic');
  }
};