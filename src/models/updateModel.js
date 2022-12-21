module.exports = (sequelize, DataTypes) => {
  return sequelize.define('updates', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    bot: DataTypes.STRING
  });
}