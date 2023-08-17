const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("Event", {
        event_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true 
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue:0.0
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        event_image:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate:{
              isUrl: true,
            }
        },
        category:{
            type: DataTypes.STRING,
            allowNull: false
        },
        rating:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        review:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        event_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        org_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        place:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        event_date:{
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },{
        timestamps: false
    })
}