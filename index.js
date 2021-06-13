const keepAlive = require('./server');
const fs = require('fs');
const funcImports = require('./functions');
const logImport = require('./log');
const Discord = require('discord.js');
const client = new Discord.Client
const discordAPIkey = process.env['DiscordAPIkey'];
const userConfig = require('./userConfig.json')
const prefix = userConfig["prefix"]
const botOwner = userConfig["BotOwnerID"]
const startupID = "838581014329950279" //userConfig["StartupNotification"];
const playerID = userConfig["PlayerTagID"]
const playertag = (`<@${playerID}>`)
process.env.TZ = userConfig["Timezone"];
const playerUUID = userConfig["MinecraftUUID"];
const logID = "846935851320999936" //userConfig["LogChannel"];
const alertID = "846935876609376266" //userConfig["NotificationsAndAlerts"];
const hypixelAPIkey = process.env['Hypixel'];

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

var readData = funcImports.readAndLoadConfigData();
    var hypixelLanguage = readData.hypixelLanguage,
    preferredMcVersion = readData.preferredMcVersion,
    notificationorange = readData.notificationorange,
    notificationred = readData.notificationred,
    notiftoggle = readData.notiftoggle,
    orangetoggle = readData.orangetoggle,
    redtoggle = readData.redtoggle,
    epochOfPause = readData.epochOfPause,
    pauseTime = readData.pauseTime,
    pauseTimeout = readData.pauseTimeout,
    alertTimeout = readData.alertTimeout,
    loginTimes = readData.loginTimes,
    whitelistedGames = readData.whitelistedGames,
    blacklistedGames = readData.blacklistedGames;


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
    const startEmbed = new Discord.MessageEmbed()
		.setColor('#23272A')
		.setTitle('Discord Bot Online')
    .setFooter('Bot by Attituding#6517', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e2/Feather_JE3_BE2.png/revision/latest/scale-to-width-down/160?cb=20190430052113', 'https://stats.uptimerobot.com/ykm7XuND5n')
		.addFields(
      {name: 'Online', value: `${client.user.tag} was restarted and is now online`},
      { name: 'Replit', value: 'https://DiscordLogger.botguy123.repl.co' },
      { name: 'Status Page', value: 'https://stats.uptimerobot.com/ykm7XuND5n' },
      )
  client.channels.cache.get(`${startupID}`).send(startEmbed)
    .then(console.log("Login Message Sent!"))
    .catch(console.error);
	client.user
		.setPresence({ activity: { name: '!help | ✔', type: 'COMPETING' }, status: 'dnd' })
		.then(console.log)
		.catch(console.error);
  setInterval(logImport.logFunction, 10000, client, playerUUID, hypixelAPIkey, logID, alertID);
});

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('you can\'t execute that command inside DMs!').then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('you can not do this!').then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
		}
	}

  if (command.ownerReq) {
		const authorID = message.author.id
		if (authorID !== botOwner) {
			return message.reply('you must be the owner to do this!').then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: ${command.usage}`;
		}

		return message.channel.send(reply).then(async msg => {
		setTimeout(() => {msg.delete();}, 20000);});
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 1) * 1000;

	if (timestamps.has(message.author.id) && message.author.id !== botOwner) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${prefix}${command.name}\` command.`).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply(`there was an error trying to execute that command! Please report this to the bot owner! Error: ${error}`, { split: true }).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
	}
});


keepAlive()
client.login((process.env.TOKEN = discordAPIkey));
