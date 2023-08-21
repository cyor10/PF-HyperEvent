const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("ticket", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true 
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0
        },
        bought_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },{
        freezeTableName: true,
        timestamps: false
    })
}