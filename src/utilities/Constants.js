const wait = require('node:timers/promises').setTimeout;

exports.cleanReply = async (message, reply) => {
  await wait(10000);
  await reply.delete();
  await message.delete();
};