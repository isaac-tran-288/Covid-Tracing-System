module.exports = (sequelize, Sequelize) => {
    const Business = sequelize.define("Business", {
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      businessName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      locations: {
        type: Sequelize.JSON,
        allowNull: true
      }
    },
    {
      freezeTableName: true
    });

    Business.associate = function(models) {
      Business.belongsTo(models.Role, {
        foreignKey: {
            allowNull: false
        }
      });
    };
  
    return Business;
  };