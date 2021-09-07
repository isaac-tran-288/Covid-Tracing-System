module.exports = (sequelize, Sequelize) => {
    const Terminal = sequelize.define("Terminal", {
        serialNumber: {
            type: Sequelize.INTEGER
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
      freezeTableName: true
    });

    Terminal.associate = function(models) {
        Terminal.belongsTo(models.Business, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Terminal;
};