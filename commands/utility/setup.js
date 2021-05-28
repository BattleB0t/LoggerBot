const Discord = require('discord.js');
module.exports = {
	name: 'setup',
	description: 'Provides intructions for setup of the bot!',
	execute(message, args, client) {
    const helpEmbed = new Discord.MessageEmbed()
			.setColor('#AA00AA')
			.setTitle('Getting Started')
			.setDescription("Welcome to Logger Bot, also known as Compromised Logger! To get started, you will need to configure your parameters.")
			.addFields(
				{ name: '!version', value: 'Start by using version, followed by the version of Minecraft that you use the most. In my case, I would do "!version 1.8.9", and you might do something like "!version 1.16.5".' },
				{ name: '!language', value: 'On Hypixel, doing /language will present valid languages for this command. For example, one could do "!language french", "!language pirate", or etc. Capitalization does not matter.' },
        {name: 'Notification Settings', value: 'Next, configure your Discord notification settings for each channel. I recommend muting the log channel, and keeping mentions on for the notification channel, the status channel and/or the command channel.'},
        {name: 'Alert Settings', value: 'This bot produces two types of alerts, Orange and Red alerts. Orange alerts occur when slightly suspicious activity is detected, such as a different version of Minecraft than the one you set. Red alerts occur when the scenario is essentially guareneted to not be you. You can turn the alerts on and off with !orange, !red, and !alert. You can also pause notifications with !pause.'}
			)
			.setFooter('Bot built by Attituding#6517.');
		message.channel.send(helpEmbed);
	},
};