'use strict';
module.exports = (sequelize, DataTypes) => {
  var eventsDonor = sequelize.define('eventsDonor', {
    eventId: DataTypes.INTEGER,
    donorId: DataTypes.INTEGER
  }, {});
  eventsDonor.associate = function(models) {
    // associations can be defined here
  };
  return eventsDonor;
};