const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("Cart", {
        cart_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true 
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "user_id" 
            }
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