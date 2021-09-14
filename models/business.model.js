module.exports = (sequelize, Sequelize) => {
    const Business = sequelize.define("Business", {
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
      locations: {
        type: Sequelize.JSON,
        allowNull: true
      },
      approved: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    });

    Business.associate = function(models) {
      Business.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
        onDelete: "cascade"
      });
    };
  
    return Business;
  };