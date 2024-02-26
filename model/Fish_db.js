const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Fish_db extends Model {

}

Fish_db.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        common_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        wiki_link: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'fish_db'
    }
)

module.exports = Fish_db;