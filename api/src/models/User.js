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
            allowNull: false
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull: false
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
            allowNull: false
        },
        userimage:{
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
        wallethistory:{
            type: DataTypes.JSON,
            allowNull: false
        },
        eventhistory:{
            type: DataTypes.JSON,
            allowNull: false
        },
        admin:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        creator:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        // cart:{
        //     //type: DataTypes.ARRAY(DataTypes.STRING),
        //     type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
        //     allowNull: true,
        //     defaultValue: [] 
        // },
    },{
        timestamps: false
    })
}