const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Fish_Available extends Model {

}

Fish_Available.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        lake_id: {
            type: DataTypes.INTEGER
        },
        fish_id: {
            type: DataTypes.INTEGER
        }

},
{
    indexes: [
        {
            unique: true,
            fields: ['lake_id', 'fish_id']
        }
    ],
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'fish_available'
}
);

module.exports = Fish_Available;