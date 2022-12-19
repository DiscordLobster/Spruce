const { Settings } = require('../objects/dbObjects');
const dayjs = require('dayjs');
const { createWriteStream } = require('fs');
const logger = createWriteStream('./src/logs/settings.log', { flags: 'a' });

module.exports = (collection) => {
  Reflect.defineProperty(collection, 'add', {
    value: async (guildId) => {
      const dateFormat = dayjs(Date.now()).format('YYYY-MM-DD hh:mm:ss');
      let settings = collection.get(guildId) || await Settings.findOne({ where: { guild_id: guildId } });
      if (settings) return false;
      else {
        settings = await Settings.create({ guild_id: guildId });
        collection.set(guildId, settings);

        logger.write(`[${dateFormat}] Initialized new bot settings for guild ID: ${guildId}`);

        return settings;
      }
    }
  });

  Reflect.defineProperty(collection, 'remove', {
    value: async (guildId) => {
      const dateFormat = dayjs(Date.now()).format('YYYY-MM-DD hh:mm:ss');
      const settings = collection.get(guildId) || await Settings.findOne({ where: { guild_id: guildId } });
      if (!settings) return false;
      else {
        await Settings.destroy({ where: { guild_id: guildId } });
        collection.delete(guildId);

        logger.write(`[${dateFormat}] Deleted bot settings for guild ID: ${guildId}`);

        return settings;
      }
    }
  });

  Reflect.defineProperty(collection, 'fetch', {
    value: async (guildId) => {
      const settings = collection.get(guildId) || await Settings.findOne({ where: { guild_id: guildId } });
      if (!settings) return false;
      else return settings;
    }
  });

  Reflect.defineProperty(collection, '_sync', {
    value: async (guildId) => {
      let settings = await Settings.findOne({ where: { guild_id: guildId } });
      settings = collection.set(guildId, settings);

      return settings;
    }
  });
}