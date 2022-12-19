const { readdirSync, createWriteStream } = require('fs');
const logger = createWriteStream('./src/logs/commands.log', { flags: 'a' });
const dayjs = require('dayjs');
const { InteractionType } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    const { commands, buttons, menus, modals } = client;
    const { commandName, customId } = interaction;

    if (interaction.isCommand()) {
      const command = commands.get(commandName);
      if (!command) return;
      const dateFormat = dayjs(Date.now()).format('YYYY-MM-DD hh:mm:ss');

      try {
        await command.execute(interaction, client);
        logger.write(`[${dateFormat}] ${interaction.user.tag} used ${commandName}\n`);
      }
      catch (err) {
        console.error(err);
      }
    }
    else if (interaction.isButton()) {
      const button = buttons.get(customId);
      if (!button) return;
      
      try {
        await button.execute(interaction, client);
      }
      catch (err) {
        console.error(err);
      }
    }
    else if (interaction.type === InteractionType.ModalSubmit) {
      const modal = modals.get(customId);
      if (!modal) return;

      try {
        await modal.execute(interaction, client);
      }
      catch (err) {
        console.error(err);
      }
    }
  },
};