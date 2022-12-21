const { Warnings } = require('../objects/dbObjects');
const dayjs = require('dayjs');
const { createWriteStream } = require('fs');
const { EmbedBuilder } = require('discord.js');
const logger = createWriteStream('./src/logs/warnings.log', { flags: 'a' });

module.exports = (collection) => {
  Reflect.defineProperty(collection, 'add', {
    value: async (offender, moderator, reason) => {
      const dateFormat = dayjs(Date.now()).format('YYYY-MM-DD hh:mm:ss');
      let warning = await Warnings.create({
        offender: offender.id,
        moderator: moderator.id,
        reason: reason,
      });

      warning = await collection._sync(warning.id);

      logger.write(`[${dateFormat}] Added new warning for ${offender.user.tag} with reason: ${reason} by moderator: ${moderator.user.tag}\n`);

      return warning;
    }
  });

  Reflect.defineProperty(collection, 'remove', {
    value: async (id, reason) => {
      const dateFormat = dayjs(Date.now()).format('YYYY-MM-DD hh:mm:ss');
      const warning = collection.get(id) || await Warnings.findOne({ where: { id: id } });
      if (!warning) return false;

      await Warnings.destroy({ where: { id: id } });
      
      logger.write(`[${dateFormat}] Warning Case ${id} was deleted for reason ${reason}`);

      return warning;
    }
  });

  Reflect.defineProperty(collection, 'fetch', {
    value: async (id) => {
      const cachedWarning = collection.get(id);
      if (cachedWarning) return cachedWarning;
      else {
        const queryWarning = await Warnings.findOne({ where: { id: id } });
        if (queryWarning) {
          collection.set(id, queryWarning);
          return queryWarning;
        }
        else return false;
      }
    }
  });

  Reflect.defineProperty(collection, 'fetchAllByUser', {
    value: async (offender) => {
      const queryWarnings = await Warnings.findAll({ where: { offender: offender } });
      if (!queryWarnings) return false;
      else {
        queryWarnings.forEach(key => collection.set(key.id, key));

        return queryWarnings;
      }
    }
  });

  Reflect.defineProperty(collection, 'fetchAll', {
    value: async () => {
      const warnings = await Warnings.findAll();
      if (!warnings) return false;
      
      return warnings;
    }
  });

  Reflect.defineProperty(collection, 'edit', {
    value: async (id, newReason) => {
      const dateFormat = dayjs(Date.now()).format('YYYY-MM-DD hh:mm:ss');
      let warning = collection.get(id) || await Warnings.findOne({ where: { id: id } });
      if (!warning) return false;

      warning = await Warnings.update({
        reason: newReason,
      }, { where: { id: id } });

      await collection._sync(id);

      logger.write(`[${dateFormat}] Edited reason for warning ${id} to: ${newReason}`);

      return warning;
    }
  });

  Reflect.defineProperty(collection, '_sync', {
    value: async (id) => {
      const warning = await Warnings.findOne({ where: { id: id } });
      if (!warning) return new Error('Issue syncing warning with the local cache: warning does not exist');
      collection.set(id, warning);

      return warning;
    }
  });

  Reflect.defineProperty(collection, '_syncAll', {
    value: async () => {
      const warnings = await Warnings.findAll();
      warnings.forEach(key => collection.set(key.id, key));

      return collection.size;
    }
  });

  Reflect.defineProperty(collection, 'calculatePages', {
    value: async (data, dataPerPage) => {
      var pages = [];

      return pages;
    }
  });
}