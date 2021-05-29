const { prefix } = require('../../userConfig.json');
module.exports = {
	name: 'ping',
	description: 'Shows the ping of the bot!',
	execute(message, args, client) {
		message.channel.send('Loading data').then(async msg => {
			msg.delete();
			message.channel.send(
				`🏓 Ping! Latency is ${msg.createdTimestamp -
					message.createdTimestamp}ms. API Latency is ${Math.round(
					client.ws.ping
				)}ms`
			);
		});
	},
};