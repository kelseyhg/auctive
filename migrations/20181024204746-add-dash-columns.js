'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('attendees', 'dessertDash', Sequelize.FLOAT);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('attendees', 'dessertDash');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
