const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("cart", {
        cart_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_mount:{
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0
        },
        events_id:{
            type: DataTypes.JSON,
            allowNull: false
        },
        bought_at:{
            type: DataTypes.DATE,
            allowNull: false
        }
    },{
        timestamps: false
    })
}