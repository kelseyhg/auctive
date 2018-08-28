'use strict';
module.exports = (sequelize, DataTypes) => {
  var attendee = sequelize.define('attendee', {
    name: DataTypes.STRING,
    nameSecondary: DataTypes.STRING,
    bidNumber: DataTypes.INTEGER,
    ticketStatus: DataTypes.STRING,
    table: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    paid: DataTypes.BOOLEAN
  }, {});
  attendee.associate = function(models) {
    models.attendee.belongsToMany(models.event, {through: "eventsAttendees"});
    models.attendee.hasMany(models.item);

  };
  return attendee;
};