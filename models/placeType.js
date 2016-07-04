module.exports = (sequelize, DataTypes) => {
  const PlaceType = sequelize.define('placeType', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  }, {
    classMethods: {
      associate: (models) => {
        PlaceType.belongsTo(models.place,
          { through: { model: 'placeType', unique: false } },
          { as: 'place', foreignKey: { name: 'placeId', allowNull: false } }
        );
        PlaceType.belongsTo(models.place,
          { through: { model: 'placeType', unique: false } },
          { as: 'type', foreignKey: { name: 'typeId', allowNull: false } }
        );
      },
    },
  });
  return PlaceType;
};
