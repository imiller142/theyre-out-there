const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class Lakes extends Model {
  // set up method to run on instance data (per user) to check password


}

Lakes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        city: {
            type: DataTypes.STRING,
            allowNull: false
        },

        latitude: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },

        longitude: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'lakes'
    }
)

module.exports = Lakes;