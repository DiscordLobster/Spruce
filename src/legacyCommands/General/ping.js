module.exports = {
	name: 'ping',
	description: 'Ping!',
	category: 'General',
	aliases: ['latency'],
	args: false,
	async execute(message, args, client) {
		message.reply({ content: 'Pong!', allowedMentions: { repliedUser: false }});
	},
};