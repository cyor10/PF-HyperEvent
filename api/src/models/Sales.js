const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("sales", {
        id:{ 
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUID,
            primaryKey: true
        },
        sales:{
            type: DataTypes.JSON,
            allowNull: false
        }
    },{
        timestamps: false
    })
}