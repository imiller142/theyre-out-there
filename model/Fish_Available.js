const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const { Fish_db, Lakes} = require('./');

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
            type: DataTypes.INTEGER,
            
            references: {
                model: 'lakes',

                key: 'id',
            }
        },
        fish_id: {
            type: DataTypes.INTEGER,
            
            references: {
                model: 'fish_db',

                key: 'id'
            }
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