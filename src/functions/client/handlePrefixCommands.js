const { readdirSync } = require('fs');

module.exports = (client) => {
  client.handlePrefixCommands = () => {
    const { prefixCmds } = client;
    const commandFolders = readdirSync('./src/legacyCommands');

    for (const folder of commandFolders) {
      const commandFiles = readdirSync(`./src/legacyCommands/${folder}`).filter(file => file.endsWith('.js'));

      for (const file of commandFiles) {
        const command = require(`../../legacyCommands/${folder}/${file}`);
        prefixCmds.set(command.name, command);
      }
    }

    console.log(`Successfully synced ${prefixCmds.size} legacy commands`);
  };
};