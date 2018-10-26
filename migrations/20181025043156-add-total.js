'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('attendees', 'totalPaid', Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('attendees', 'totalPaid');
  }
};
