'use strict';
module.exports = (sequelize, DataTypes) => {
  var purchasesAttendees = sequelize.define('purchasesAttendees', {
    purchaseId: DataTypes.INTEGER,
    attendeeId: DataTypes.INTEGER
  }, {});
  purchasesAttendees.associate = function(models) {
    // associations can be defined here
  };
  return purchasesAttendees;
};