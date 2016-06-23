module.exports = (sequelize, DataTypes) => {
  const Fav = sequelize.define('fav', {
    starred: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Fav.belongsTo(models.user,
          { as: 'user', foreignKey: { name: 'userId', allowNull: false } }
        );
        Fav.belongsTo(models.place,
          { as: 'place', foreignKey: { name: 'placeId', allowNull: false } }
        );
      },
    },
  });
  return Fav;
};
