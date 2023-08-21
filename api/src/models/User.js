const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("user", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true 
        },
        name:{
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        username:{
            type: DataTypes.STRING,
            allowNull: true
        },
        user_image:{
            type: DataTypes.TEXT,
            allowNull: true,
            validate:{
                isUrl: true
            },
            defaultValue: 'https://cdn.vectorstock.com/i/preview-1x/62/38/avatar-13-vector-42526238.jpg'
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        wallet_history:{
            type: DataTypes.JSON,
            allowNull: true
        },
        admin:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    },{
        freezeTableName: true,
        timestamps: false
    })
}