module.exports = (sequelize, Sequelize) => {
    const Tracer = sequelize.define("Tracer", {
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

    Tracer.associate = function(models) {
      Tracer.belongsTo(models.Role, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Tracer;
  };