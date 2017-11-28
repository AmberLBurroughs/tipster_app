var bcrypt       = require('bcrypt');

module.exports   = (sequelize, DataTypes) => {
  const LocalKey = sequelize.define("LocalKey", {
  localPassword: {
      type: DataTypes.STRING,
      required: true
    }
  });

  // methods ======================
  // generating a hash
  
  LocalKey.generateHash = function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  // checking if password is valid
  LocalKey.prototype.validPassword = function(password) {
      return bcrypt.compareSync(password, this.localPassword);
  };

  LocalKey.associate = function(models) {
  	LocalKey.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  }
      return LocalKey;
};
