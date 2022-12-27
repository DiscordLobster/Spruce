module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(message, args, client) {
		message.reply({ content: 'Pong!', allowedMentions: { repliedUser: false }});
	},
};