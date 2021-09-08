module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("Admin", {
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
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

    Admin.associate = function(models) {
      Admin.belongsTo(models.Role, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Admin;
  };