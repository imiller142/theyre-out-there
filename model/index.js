const User = require('./User')
const Lakes = require('./Lakes')
const Fish_Available = require('./Fish_Available');
const Fish_db = require('./Fish_db');
const Fish_Caught = require('./Fish_Caught');


//fish caught associations
User.hasMany(Fish_Caught, {
    foreignKey: 'user_id'
});

Fish_db.hasMany(Fish_Caught, {
    foreignKey: 'fish_id'
})

Fish_Caught.belongsTo(Fish_db, {
    foreignKey: 'fish_id'
})

Fish_Caught.belongsTo(Lakes, {
    foreignKey: 'lake_id'
})

Lakes.hasMany(Fish_Caught, {
    foreignKey: 'lake_id'
})

Fish_Caught.belongsTo(User, {
    foreignKey: 'user_id'
})


//lakes and fish associations
Lakes.belongsToMany(Fish_db, {
    through: Fish_Available,
    as: 'fish_here',
    foreignKey: 'lake_id'
});

Fish_db.belongsToMany(Lakes, {
    through: Fish_Available,
    as: 'fish_here',
    foreignKey: 'fish_id'
})

Fish_Available.belongsTo(Lakes, {
    foreignKey: 'lake_id'
})

Fish_Available.belongsTo(Fish_db, {
    foreignKey: 'fish_id'
})

Lakes.hasOne(Fish_Available, {
    foreignKey: 'lake_id'
})

Fish_db.hasOne(Fish_Available, {
    foreignKey: 'fish_id'
})

module.exports = { User, Lakes, Fish_Available, Fish_db, Fish_Caught }