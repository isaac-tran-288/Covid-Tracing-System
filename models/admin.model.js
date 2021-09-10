module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("Admin", {
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    });

    Admin.associate = function(models) {
      Admin.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
        onDelete: "cascade"
      });
    };
  
    return Admin;
  };