'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeam: {
        type: Sequelize.NUMBER,
        allowNull: false, 
        field:'home_team',
        references: {
          model: 'teams',
          key: 'id',
        }
      },
      homeTeamGoals: {
        type: Sequelize.NUMBER,
        allowNull: false,
        field:'home_team_goals',
      },
      awayTeam: {
        type: Sequelize.NUMBER,
        allowNull: false, 
        field:'away_team',
        references: {
          model: 'teams',
          key: 'id',
        }
      },
      awayTeamGoals: {
        type: Sequelize.NUMBER,
        allowNull: false,
        field:'away_team_goals',
      },
      inProgress: {
        type: Sequelize.NUMBER,
        allowNull: false,
        field:'in_progress',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};