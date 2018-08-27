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
  };
  return event;
};