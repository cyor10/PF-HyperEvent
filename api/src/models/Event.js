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
        org_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
            type: DataTypes.JSON,
            allowNull: true
        },
        place_name: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        postal: {
            type: DataTypes.STRING,
            allowNull: true
        },
        start_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        intro: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        social_media: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        event_image: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        top_event: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: 0.0
        },
        review: {
            type: DataTypes.JSON,
            allowNull: true
        },
    }, {
        freezeTableName: true,
        timestamps: false
    })
}