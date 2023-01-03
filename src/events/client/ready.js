const { ActivityType } = require("discord.js");

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`Successfully logged in as ${client.user.tag}!`);

    client.user.setPresence({ activities: [{ name: 'with lots of bugs!', type: ActivityType.Playing }], status: 'dnd' });
  },
};