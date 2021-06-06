const { prefix } = require('../../userConfig.json');
module.exports = {
	name: 'shutdown',
	description: 'Shuts down the bot',
  usage: `\`${prefix}shutdown\``,
  ownerReq: true,
	execute(message, args, client) {
		message.channel.send('Shutting down...').then(m => {
        client.destroy();
      });
	},
};