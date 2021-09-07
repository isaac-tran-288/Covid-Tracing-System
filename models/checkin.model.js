module.exports = (sequelize, Sequelize) => {
    const CheckIn = sequelize.define("CheckIn", {
        location: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
      freezeTableName: true
    });

    CheckIn.associate = function(models) {
        CheckIn.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return CheckIn;
};