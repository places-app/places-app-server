module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true,
    },
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    fbId: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    currLat: DataTypes.STRING,
    currLng: DataTypes.STRING,
    prevLat: DataTypes.STRING,
    prevLng: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    repCount: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: (models) => {
        User.belongsToMany(models.place, { through: 'userPlaces' },
          { as: 'place', foreignKey: { name: 'placeId', allowNull: false } }
        );
        User.hasMany(models.fav);
        User.hasMany(models.follow);
      },
    },
  });
  return User;
};
