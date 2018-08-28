'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.addColumn('items', 'name', Sequelize.STRING);
},

  down: (queryInterface, Sequelize) => {
  return queryInterface.removeColumn('items', 'name');
      /*Example:
      return queryInterface.dropTable('users');
    */
  }
};
