const {DataTypes} = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("events", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        tickets:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        site:{
            type: DataTypes.TEXT,
            validate:{
                isUrl: true,
            }
        },
        image:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate:{
              isUrl: true,
            }
          },
        description:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        date:{
            type: DataTypes.DATEONLY
        }
    },{
        timestamps: false
    })
}