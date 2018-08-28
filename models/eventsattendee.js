'use strict';
module.exports = (sequelize, DataTypes) => {
  var eventsAttendee = sequelize.define('eventsAttendee', {
    eventId: DataTypes.INTEGER,
    attendeeId: DataTypes.INTEGER
  }, {});
  eventsAttendee.associate = function(models) {
    // associations can be defined here
  };
  return eventsAttendee;
};