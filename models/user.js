module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {

    username: {
      type: DataTypes.STRING,
      defaultValue: generateUsername(),
      required: true
    },

    email: {
      type: DataTypes.STRING,
      isUnique :true,
      allowNull:false,
      required: true,
      validate: {
                isEmail : true
            }
    },

    firstName: {
      type: DataTypes.STRING,
    },

    lastName: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
      defaultValue: "/assets/uploads/tie-up.png" 
    },

  });

  // methods ======================
  User.generateUsername = (email) => {

    // email split on @ , anything before @
    // create a random hash of number letters and sybols (4)
    // add hash to the arr of new string of email that was split

    console.log("hello") 
  } 
      return User;
};