module.exports = (sequelize, DataTypes) => {
  const UserPlace = sequelize.define('userPlace', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    note: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    videoUrl: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        UserPlace.belongsTo(models.user,
          { through: { model: 'userPlace', unique: false } },
          { as: 'user', foreignKey: { name: 'userId', allowNull: false } }
        );
        UserPlace.belongsTo(models.place,
          { through: { model: 'userPlace', unique: false } },
          { as: 'place', foreignKey: { name: 'placeId', allowNull: false } }
        );
        UserPlace.hasMany(models.fav,
          { as: 'userPlace', foreignKey: { name: 'userPlaceId', allowNull: false } }
        );
      },
    },
  });
  return UserPlace;
};
