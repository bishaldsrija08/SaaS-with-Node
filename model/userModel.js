module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      googelId: {
        type: DataTypes.STRING,
        allowNull : false
      },
      username: {
        type: DataTypes.STRING,
        allowNull:false
      },
      currentOrgNumber:{
        type: DataTypes.INTEGER,
        allowNull: true
      }

    
    });
    return User;
  };