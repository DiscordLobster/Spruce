require('dotenv').config();

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    const { devCommands } = client;
    const { author } = message;

    if (author.id === process.env.DEV_ID) {
      const devCommand = devCommands.get(message.content);
      if (!devCommand) return;

      try {
        await devCommand.execute(message, client);
      }
      catch (err) {
        console.error(err);
      }
    }
  },
};