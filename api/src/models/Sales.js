const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("Sales", {
        id:{ 
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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