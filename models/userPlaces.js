module.exports = (sequelize, DataTypes) => {
  const UserPlaces = sequelize.define('userPlaces', {
    note: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    videoUrl: DataTypes.STRING,
  });
  return UserPlaces;
};
