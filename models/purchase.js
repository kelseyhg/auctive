'use strict';
module.exports = (sequelize, DataTypes) => {
  var purchase = sequelize.define('purchase', {
    name: DataTypes.STRING,
    cost: DataTypes.INTEGER
  }, {});
  purchase.associate = function(models) {
     models.purchase.belongsToMany(models.attendee, {through: 'purchasesAttendees'});
     models.purchase.belongsTo(models.event);
  };
  return purchase;
};