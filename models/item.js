'use strict';
module.exports = (sequelize, DataTypes) => {
  var item = sequelize.define('item', {
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    eventId: DataTypes.INTEGER,
    donorId: DataTypes.INTEGER,
    marketPrice: DataTypes.INTEGER,
    soldPrice: DataTypes.INTEGER,
    attendeeId: DataTypes.INTEGER
  }, {});
  item.associate = function(models) {
   models.item.belongsTo(models.donor);
   models.item.belongsTo(models.attendee);
   models.item.belongsTo(models.event);
  };
  return item;
};