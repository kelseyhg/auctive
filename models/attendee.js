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
    paid: DataTypes.BOOLEAN,
    cardPayment: DataTypes.INTEGER,
    cashPayment: DataTypes.NUMERIC,
    dessertDash: DataTypes.FLOAT,
    dessertPaid: DataTypes.BOOLEAN,
    totalPaid: DataTypes.INTEGER
  }, {});
  attendee.associate = function(models) {
    models.attendee.belongsToMany(models.event, {through: "eventsAttendees"});
    models.attendee.hasMany(models.item);
    models.attendee.belongsToMany(models.purchase, {through: "purchasesAttendees"})

  };
  return attendee;
};