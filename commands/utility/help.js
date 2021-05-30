const { prefix } = require('../../userConfig.json');
module.exports = {
	name: 'help',
	description: 'List all of the commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 2,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('Here\'s a list of all available commands:');
			data.push(commands.map(command => command.name).join(`, `));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you!').then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!').then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
    if (command.cooldown != undefined) data.push(`**Cooldown:** ${command.cooldown} second(s)`);
    if (command.permissions) data.push(`**Required Permission(s):** ${command.permissions}`);

		message.channel.send(data, { split: true });
	},
};