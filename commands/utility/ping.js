module.exports = {
	name: 'ping',
	description: 'Ping!',
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