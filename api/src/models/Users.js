const {DataTypes} = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("users", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING
        },
        cart:{
            //type: DataTypes.ARRAY(DataTypes.STRING),
            type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
            allowNull: true,
            defaultValue: [] 
        },
        name:{
            type: DataTypes.STRING
        },
        image:{
            type: DataTypes.TEXT,
            allowNull: true,
            /* validate:{
                isUrl: true
            }, */
            defaultValue: 'https://cdn.vectorstock.com/i/preview-1x/62/38/avatar-13-vector-42526238.jpg'
        }
    },{
        timestamps: false
    })
}