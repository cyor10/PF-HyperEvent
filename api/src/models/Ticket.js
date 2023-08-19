const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("Ticket", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0
        },
        // totalmount:{
        //     type: DataTypes.INTEGER,
        //     allowNull:false,
        //     defaultValue:0
        // },
        // eventsid:{
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        boughtAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },{
        timestamps: false
    })
}