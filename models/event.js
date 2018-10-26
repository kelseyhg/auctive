'use strict';
module.exports = (sequelize, DataTypes) => {
  var event = sequelize.define('event', {
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {});
  event.associate = function(models) {
    models.event.belongsTo(models.user);
    models.event.hasMany(models.item);
    models.event.hasMany(models.purchase);
    models.event.belongsToMany(models.donor, {through: "eventsDonors"});
    models.event.belongsToMany(models.attendee, {through: "eventsAttendees"});
  };
  return event;
};