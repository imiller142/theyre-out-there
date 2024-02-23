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
        }

}
)