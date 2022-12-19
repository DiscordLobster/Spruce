module.exports = (sequelize, DataTypes) => {
  return sequelize.define('warnings', {
    offender: DataTypes.STRING,
    moderator: DataTypes.STRING,
    reason: DataTypes.TEXT,
  });
}