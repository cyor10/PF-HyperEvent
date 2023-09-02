const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("comment", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        show: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        timestamps: true
    })
}