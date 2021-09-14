module.exports = (sequelize, Sequelize) => {
    const CheckIn = sequelize.define("CheckIn", {
        location: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true
        }
    },
    {
      freezeTableName: true
    });

    CheckIn.associate = function(models) {
        CheckIn.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return CheckIn;
};