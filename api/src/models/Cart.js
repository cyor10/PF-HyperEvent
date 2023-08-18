const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("cart", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUID,
            primaryKey: true 
        },
        userid:{
            type: DataTypes.INTEGER,
            allowNull: false,
           /*  references: {
                model: "user",
                key: "user_id" 
            } */
        },
        totalmount:{
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0
        },
        eventsid:{
            type: DataTypes.STRING,
            allowNull: false
        },
        boughtat:{
            type: DataTypes.DATE,
            allowNull: false
        }
    },{
        timestamps: false
    })
}