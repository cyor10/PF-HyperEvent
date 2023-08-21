const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("event", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        event_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        event_image: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        org_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        place_name: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        adress: {
            type: DataTypes.JSON,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        province: {
            type: DataTypes.STRING,
            allowNull: true
        },
        postal: {
            type: DataTypes.STRING,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        start_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_at: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        intro: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: 'intro'
        },
        social_media: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        freezeTableName: true,
        timestamps: false
    })
}