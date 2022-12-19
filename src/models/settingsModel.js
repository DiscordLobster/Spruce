module.exports = (sequelize, DataTypes) => {
  return sequelize.define('spruce_settings', {
    guild_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    mod_logs: DataTypes.STRING,
    member_logs: DataTypes.STRING,
    channel_logs: DataTypes.STRING,
    message_logs: DataTypes.STRING,
  });
}