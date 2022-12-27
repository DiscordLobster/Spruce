module.exports = (sequelize, DataTypes) => {
  return sequelize.define('spruce_settings', {
    guild_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    prefix: {
      type: DataTypes.STRING,
      defaultValue: 's!',
      allowNull: false,
    },
    mod_logs: DataTypes.STRING,
    member_logs: DataTypes.STRING,
    channel_logs: DataTypes.STRING,
    message_logs: DataTypes.STRING,
    update_channel: DataTypes.STRING,
    ticket_logs: DataTypes.STRING,
    ticket_channel: DataTypes.STRING,
    suggest_channel: DataTypes.STRING,
    helper_icon: DataTypes.STRING,
    mod_icon: DataTypes.STRING,
    admin_icon: DataTypes.STRING,
    manager_icon: DataTypes.STRING,
    owner_icon: DataTypes.STRING,
    developer_icon: DataTypes.STRING,
  });
}