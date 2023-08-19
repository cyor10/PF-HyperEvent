const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("Event", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true 
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
        eventName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        orgName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        placeName:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        adress:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        city:{
            type: DataTypes.STRING,
            allowNull: true
        },
        province:{
            type: DataTypes.STRING,
            allowNull: true
        },
        postal:{
            type: DataTypes.STRING,
            allowNull: true
        },
        country:{
            type: DataTypes.STRING,
            allowNull: true
        },
        startAt:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        endAt:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        intro:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        socialMedia: {
            type: DataTypes.ARRAY(DataTypes.STRING), 
            allowNull: true,
            validate: {
              isUrl: true,
            },
          },
    },{
        timestamps: false
    })
}