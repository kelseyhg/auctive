'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('attendees', 'dessertPaid', Sequelize.BOOLEAN);
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('attendees', 'dessertPaid');
  }
};
