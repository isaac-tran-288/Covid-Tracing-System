module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    });

    User.associate = function(models) {
      User.belongsTo(models.Role, {
        foreignKey: {
          allowNull: false
        },
        onDelete: "cascade"
      });
    };
  
    return User;
  };