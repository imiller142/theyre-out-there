const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

// create our User model
class Fish_Caught extends Model {
  // set up method to run on instance data (per user) to check password
  static ascFishLake(body, models) {
    return models.Fish_Available.findOrCreate({
      where: {lake_id: body.lake_id, fish_id: body.fish_id}
    })
  }
}

Fish_Caught.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false
    },
    length: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    lake_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'lakes',

        key: 'id'
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
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'fish_caught'
  }
)


module.exports = Fish_Caught;