const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("event", {
        id:{
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
        eventimage:{
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
        eventname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        orgname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        place:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        eventdate:{
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },{
        timestamps: false
    })
}