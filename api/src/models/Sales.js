const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("sales", {
        sales_id:{ 
            type: DataTypes.UUIDV4,
            autoIncrement:true,
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