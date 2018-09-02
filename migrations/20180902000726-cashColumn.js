'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('attendees', 'cashPayment', Sequelize.NUMERIC);
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('attendees', 'cashPayment');

  }
};
