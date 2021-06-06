const { prefix } = require('../../userConfig.json');
const Discord = require('discord.js');
module.exports = {
	name: 'help',
	description: 'List all of the commands or info about a specific command.',
	aliases: ['commands'],
	usage: `\`${prefix}help <command name>\``,
	cooldown: 2,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
      const commandHelp = new Discord.MessageEmbed()
        .setColor('#7289DA')
        .setTitle(`Help!`)
        .setFooter(`Executed at ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621');
        commandHelp.addField(`All Commands`, `${commands.map(command => prefix + command.name).join(`, `)}\n\nYou can send \`${prefix}help <command name>\` to get info on a specific command, along with aliases that can also execute the same command!`);

			return message.author.send(commandHelp)
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

    const commandHelp = new Discord.MessageEmbed()
        .setColor('#7289DA')
        .setTitle(`${prefix}${command.name}`)
        .setFooter(`Executed at ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621');
		    if (command.description) commandHelp.setDescription(`${command.description}`);
        if (command.aliases) commandHelp.addField(`Aliases`, `${prefix + command.aliases.join(`, ${prefix}`)}`);
        if (command.usage) commandHelp.addField(`Usage`, `${command.usage}`);
        if (command.cooldown != undefined) commandHelp.addField(`Cooldown`, `${command.cooldown} second(s)`);
        if (command.permissions) commandHelp.addField(`Required Permission(s)`, `${command.permissions}`);
message.reply(commandHelp);
	},
};