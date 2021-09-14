module.exports = (sequelize, Sequelize) => {
    const Public = sequelize.define("Public", {
      name: {
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
        allowNull: false
      },
      qr: {
        type: Sequelize.STRING.BINARY,
        unique: true,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    });

    Public.associate = function(models) {
        Public.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
        onDelete: "cascade"
      });
    };
  
    return Public;
};