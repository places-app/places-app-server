module.exports = (sequelize, DataTypes) => {
  const UserPlaces = sequelize.define('userPlaces', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true,
    },
    note: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    videoUrl: DataTypes.STRING,
  });
  return UserPlaces;
};
