const { Settings } = require('../objects/dbObjects');
const dayjs = require('dayjs');
const { createWriteStream } = require('fs');
const logger = createWriteStream('./src/logs/settings.log', { flags: 'a' });

module.exports = (collection) => {

  /**
   * botSettings.add(guildId);
   * 
   * Adds a new settings entry to the database and saves it to the bot's local cache. Similarily, the bot also logs the output
   * to a log file in the logs folder. If settings already exist for this id it returns false.
   * 
   * guildId - a valid Discord Guild ID
   */

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

  /**
   * botSettings.remove(guildId);
   * 
   * Removes a settings entry for a guild based on it's ID by searching for a query in the database. If the query exists it
   * deletes the entry and returns the settings before they were deleted. If no entry was found it returns false. This also
   * removes the data from the bot's local cache too.
   * 
   * guildId - a valid Discord Guild ID
   */

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

  /**
   * botSettings.fetch(guildId);
   * 
   * Fetches the settings data for a guild's bot settings by it's server ID and returns the data. It tries to pull from the local
   * cache first and then queries the database if no result was found. If no settings can be found it returns false.
   * 
   * guildId - a valid Discord Guild ID
   */

  Reflect.defineProperty(collection, 'fetch', {
    value: async (guildId) => {
      const settings = collection.get(guildId) || await Settings.findOne({ where: { guild_id: guildId } });
      if (!settings) return false;
      else return settings;
    }
  });

  /**
   * botSettings._sync(guildId);
   * 
   * (Only used in this file itself not required outside)
   * Syncs the queried data from the database to the local cache or 'collection'
   * 
   * guildId - A valid Discord Guild ID
   */

  Reflect.defineProperty(collection, '_sync', {
    value: async (guildId) => {
      let settings = await Settings.findOne({ where: { guild_id: guildId } });
      settings = collection.set(guildId, settings);

      return settings;
    }
  });
}