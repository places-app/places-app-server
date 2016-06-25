module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('follow', {
    following: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Follow.belongsTo(models.user,
          { as: 'user', foreignKey: { name: 'userId', allowNull: false } }
        );
        Follow.belongsTo(models.user,
          { as: 'user', foreignKey: { name: 'followedId', allowNull: false } }
        );
      },
    },
  });
  return Follow;
};
