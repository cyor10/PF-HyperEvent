const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("event", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true 
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
        place_name:{
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
        start_at:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        end_at:{
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
        social_media: {
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