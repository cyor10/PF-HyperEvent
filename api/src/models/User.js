const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("User", {
        user_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true 
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name:{
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
            allowNull: false
        },
        event_history:{
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