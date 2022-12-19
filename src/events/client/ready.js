module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`Successfully logged in as ${client.user.tag}!`);
  },
};