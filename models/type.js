module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('type', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Type.belongsToMany(models.place,
          { through: { model: 'placeType', unique: false } },
          { as: 'place', foreignKey: { name: 'placeId', allowNull: false } }
        );
      },
    },
  });
  return Type;
};
