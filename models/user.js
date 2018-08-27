var bcrypt = require('bcrypt');

'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    orgName: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "please enter a valid email."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
          len: {
            args: [6,16],
            msg: "password must be 6-16 characters"
          }
      }
    },
    admin: DataTypes.BOOLEAN,
    }, {
    hooks: {
      beforeCreate: function(pendingUser) {
        if(pendingUser && pendingUser.password){
          var hash = bcrypt.hashSync(pendingUser.password, 10);
          pendingUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {
   models.user.hasMany(models.event);
  };

  user.prototype.isValidPassword = function(typedPassword){
    return bcrypt.compareSync(typedPassword, this.password);
  }

  return user;
};