module.exports = (sequelize, Sequelize) => {
    const Tracer = sequelize.define("Tracer", {
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      approved: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    });

    Tracer.associate = function(models) {
      Tracer.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
        onDelete: "cascade"
      });
    };
  
    return Tracer;
  };