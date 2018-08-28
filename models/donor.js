'use strict';
module.exports = (sequelize, DataTypes) => {
  var donor = sequelize.define('donor', {
    name: DataTypes.STRING,
    contactName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {});
  donor.associate = function(models) {
    models.donor.belongsToMany(models.event, {through: 'eventsDonors'});
    models.donor.hasMany(models.item);
  };
  return donor;
};