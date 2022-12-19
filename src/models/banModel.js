module.exports = (sequelize, DataTypes) => {
  return sequelize.define('bans', {
    offender: DataTypes.STRING,
    moderator: DataTypes.STRING,
    reason: DataTypes.TEXT,
  });
}