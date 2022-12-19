module.exports = (sequelize, DataTypes) => {
  return sequelize.define('mutes', {
    offender: DataTypes.STRING,
    moderator: DataTypes.STRING,
    reason: DataTypes.TEXT,
  });
}