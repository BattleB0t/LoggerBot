const keepAlive = require('./server');
const fs = require('fs');
const funcImports = require('./functions');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const hypixelAPIkey = process.env['Hypixel'];
const client = new Discord.Client
const discordAPIkey = process.env['DiscordAPIkey'];
const userConfig = require('./userConfig.json')
const prefix = userConfig["prefix"]
const uuid = userConfig["MinecraftUUID"];
const logID = "846935851320999936" //userConfig["LogChannel"];
const alertID = "846935876609376266" //userConfig["NotificationsAndAlerts"];
const startupID = "838581014329950279" //userConfig["StartupNotification"];
const playerID = userConfig["PlayerTagID"]
const playertag = (`<@${playerID}>`)
process.env.TZ = userConfig["Timezone"];

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

globalThis.executed = false;
globalThis.executed1 = false;

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
    pauseTimeout = readData.pTimeout,
    alertTimeout = readData.aTimeout;


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
    const startEmbed = new Discord.MessageEmbed()
		.setColor('#23272A')
		.setTitle('Discord Bot Online')
		.setThumbnail('https://emoji.gg/assets/emoji/Pingsock.png')
		.addFields(
      {name: 'Online', value: `${client.user.tag} was restarted and is now online`},
      { name: 'Replit', value: 'https://DiscordLogger.botguy123.repl.co' },
      { name: 'Status Page', value: 'https://stats.uptimerobot.com/ykm7XuND5n' },
      )
		.setFooter('Bot by Attituding#6517');
  client.channels.cache.get(`${startupID}`).send(startEmbed)
    .then(console.log("Login Message Sent!"))
    .catch(console.error);
	client.user
		.setPresence({ activity: { name: '!help | ✔', type: 'COMPETING' }, status: 'dnd' })
		.then(console.log)
		.catch(console.error);
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
		return message.reply('I can\'t execute that command inside DMs!').then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can not do this!').then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!').then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
	}
});

setInterval(myMethod, 10000);

function myMethod() {
const log = client.channels.cache.get(`${logID}`);
const alerts = client.channels.cache.get(`${alertID}`);

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
    pauseTimeout = readData.pTimeout,
    alertTimeout = readData.aTimeout;

	fetch(`https://api.hypixel.net/status?uuid=${uuid}&key=${hypixelAPIkey}`) //i dont think this is promise based but it works
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			status = data;
			return fetch(`https://api.hypixel.net/player?uuid=${uuid}&key=${hypixelAPIkey}`);
		})
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			player = data;

			function secondsToDLastLogin(seconds) { //calculting days for last login
				seconds1 = Number(seconds);
				var d = Math.floor(seconds / (3600 * 24));
				var dDisplay = d > 0 ? d + (d == 1 ? ' day ' : ' days ') : '';
				return dDisplay;
			}

			function secondsToDLastLogout(seconds) { //calculating days for last logout
				seconds1 = Number(seconds);
				var d = Math.floor(seconds / (3600 * 24));
				var dDisplay = d > 0 ? d + (d == 1 ? ' day ' : ' days ') : '';
				return dDisplay;
			}

      function secondsToDLastPlaytime(seconds) { //days for last playtime
				seconds1 = Number(seconds);
				var d = Math.floor(seconds / (3600 * 24));
				var dDisplay = d > 0 ? d + (d == 1 ? ' day ' : ' days ') : '';
				return dDisplay;
			}
            var newdate = new Date();
            var datestring = newdate.toLocaleDateString();
            var timestring = newdate.toLocaleTimeString();

            var playerName = player.player.displayname

            var daysofLastLogin = secondsToDLastLogin((new Date() - player.player.lastLogin) / 1000); //Main possible Variables in logs
            var daysofLastLogout = secondsToDLastLogout((new Date() - player.player.lastLogout) / 1000);
                    var daysLastPlaytime = secondsToDLastPlaytime((player.player.lastLogout - player.player.lastLogin) / 1000);

            var mostRecentGametype = player.player.mostRecentGameType
            var currentGametype = status.session.gameType //can only be used when player is online
            var gameMode = status.session.mode
            var map = status.session.map

            var msLastLogin = (new Date() - player.player.lastLogin) / 1000
            var timeOfLogin = new Date(player.player.lastLogin).toLocaleTimeString()
            var dateOfLogin = new Date(player.player.lastLogin).toLocaleDateString()
            var secLastLogin = Math.round((new Date() - player.player.lastLogin) / 1000);
	        var hmsLastLogin = new Date(Math.round(secLastLogin * 1000)).toISOString().substr(11, 8);

            var msLastLogout = (new Date() - player.player.lastLogout) / 1000
			var secLastLogout = Math.round((new Date() - player.player.lastLogout) / 1000);
			var hmsLastLogout = new Date(Math.round(secLastLogout * 1000)).toISOString().substr(11, 8);

			var secLastPlaytime = Math.round((player.player.lastLogout - player.player.lastLogin) / 1000);
			var hmsLastPlaytime = new Date(Math.round(secLastPlaytime * 1000)).toISOString().substr(11, 8);

			var offlineLastLogin = new Date(new Date() - (new Date() - player.player.lastLogin));
			var offlineLastLogout = new Date(new Date() - (new Date() - player.player.lastLogout));

			var MCversion = player.player.mcVersionRp; //Version of Minecraft
			var userLanguage = player.player.userLanguage; //Language

			var hoursLastLogin = new Date(player.player.lastLogin).getHours();

      var relogEventTime = (player.player.lastLogin - player.player.lastLogout) / 1000; //End of main possible Varialbes in logss

			switch (new Date().getDay()) { //not very efficient, but ig it works
				case 0:
					globalThis.offlinehour = Number(9);
					break;
				case 1:
					globalThis.offlinehour = Number(8);
					break;
				case 2:
					globalThis.offlinehour = Number(8);
					break;
				case 3:
					globalThis.offlinehour = Number(8);
					break;
				case 4:
					globalThis.offlinehour = Number(8);
					break;
				case 5:
					globalThis.offlinehour = Number(8);
					break;
				case 6:
					globalThis.offlinehour = Number(9);
			}

            function events() {
                function relogEvent() {
                if (!executed && notificationorange == true && msLastLogin <= 10 && (relogEventTime < 10 && relogEventTime > 0)) {
                    globalThis.executed = true;
                    var roundedRelogTime = Math.round(relogEventTime * 100) / 100
                    globalThis.relogtime = (`${roundedRelogTime} seconds`);
                    const shortSessionEmbed = new Discord.MessageEmbed()
                        .setColor('#FFAA00')
                        .setTitle('**Relog detected!**')
                        .setFooter(`Alert at ${datestring} | ${timestring}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e2/Feather_JE3_BE2.png/revision/latest/scale-to-width-down/160?cb=20190430052113')
                    log.send(shortSessionEmbed);
                    alerts.send(`${playertag}, a relog was detected at ${timestring}. Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
                    function resetrelogevent() {
                        globalThis.executed = false;
                      }
                    setTimeout(resetrelogevent, 10100);
                    return true;
                    }
                return false;
                }
                function shortSessionEvent() {
                if (!executed1 && notificationorange == true && !status.session.online && msLastLogout <= 20 && (secLastPlaytime < 10 && secLastPlaytime > 0)) {
                    globalThis.executed1 = true;
                    const shortSessionEmbed = new Discord.MessageEmbed()
                        .setColor('#FFAA00')
                        .setTitle('**Short Session detected!**')
                        .setFooter(`Alert at ${datestring} | ${timestring}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e2/Feather_JE3_BE2.png/revision/latest/scale-to-width-down/160?cb=20190430052113')
                    log.send(shortSessionEmbed);
                    alerts.send(`${playertag}, a short session was detected at ${timestring}. Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
                    function resetshortevent() {
                        globalThis.executed1 = false;
                    }
                    setTimeout(resetshortevent, 20100);
                    return true;
                    }
                return false;
                }
                
                    if (relogEvent() == true || shortSessionEvent() == true) return;

                    if (msLastLogin <= 10 && notificationorange == true) { //Sends msg to discord notif on login
                      const loginEmbed = new Discord.MessageEmbed()
                          .setColor('#00AA00')
                          .setTitle('**Login detected!**')
                          .setThumbnail(`https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621`)
                        .setFooter(`Alert at ${datestring} | ${timestring}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e2/Feather_JE3_BE2.png/revision/latest/scale-to-width-down/160?cb=20190430052113')
                          .setDescription(`Login at ${offlineLastLogin.toLocaleTimeString()} was detected at ${timestring}.`);
                        log.send(loginEmbed);
                        alerts.send(`${playertag}, a new login at ${offlineLastLogin.toLocaleTimeString()} was detected at ${timestring}.`, {tts: true});
                        }
                  
                     if (msLastLogout <= 10 && notificationorange == true) { //Sends msg to discord notif on logout
                      const logoutEmbed = new Discord.MessageEmbed()
                          .setColor('#555555')
                          .setTitle('**Logout detected!**')
                          .setThumbnail(`https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621`)
                        .setFooter(`Alert at ${datestring} | ${timestring}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e2/Feather_JE3_BE2.png/revision/latest/scale-to-width-down/160?cb=20190430052113')
                          .setDescription(`Logout at ${offlineLastLogout.toLocaleTimeString()} was detected at ${timestring}.`);
                        log.send(logoutEmbed);
                        alerts.send(`${playertag}, a logout at ${offlineLastLogout.toLocaleTimeString()} was detected at ${timestring}.`, {tts: true});
                        } 
            }
            events();

  function useData() {

if (!status.session.online) {
	    var embedColor = ('#555555')
		  var embedTitle = ('**Offline!**')
      var languageAlert = false;
      var versionAlert = false;
      var loginTimeAlert = false;

    return {embedColor, embedTitle, languageAlert, versionAlert, loginTimeAlert};
	}

if (hypixelLanguage !== userLanguage && MCversion !== preferredMcVersion && hoursLastLogin < globalThis.offlinehour) {
		  var embedColor = ('#AA0000')
		  var embedTitle = ('**Unusual language, version, and login time detected!**')
      var languageAlert = true;
      var versionAlert = true;
      var loginTimeAlert = true;

		if (notificationred == true) {
		  alerts.send(`${playertag}, Red Alert! Unusual language, version, and login time detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
		}
    return {embedColor, embedTitle, languageAlert, versionAlert, loginTimeAlert};
} else if (hypixelLanguage !== userLanguage && hoursLastLogin < globalThis.offlinehour) {
      var embedColor = ('#AA0000')
		  var embedTitle = ('**Unusual language and login time detected!**')
      var languageAlert = true;
      var versionAlert = false;
      var loginTimeAlert = true;

		if (notificationred == true) {
		  alerts.send(`${playertag}, Red Alert! Unusual user language and login time detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
    }
    return {embedColor, embedTitle, languageAlert, versionAlert, loginTimeAlert};
} else if (MCversion !== preferredMcVersion && hypixelLanguage !== userLanguage) {
      var embedColor = ('#AA0000')
		  var embedTitle = ('**Unusual language and version detected!**')
      var languageAlert = true;
      var versionAlert = true;
      var loginTimeAlert = false;

		if (notificationred == true) {
		  alerts.send(`${playertag}, Red Alert! Unusual user language and version of Minecraft detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
    }
    return {embedColor, embedTitle, languageAlert, versionAlert, loginTimeAlert};
} else if (MCversion !== preferredMcVersion && hoursLastLogin < globalThis.offlinehour) {
      var embedColor = ('#FFAA00')
		  var embedTitle = ('**Unusual version and login time detected!**')
      var languageAlert = false;
      var versionAlert = true;
      var loginTimeAlert = true;

		if (notificationorange == true) {
		  alerts.send(`${playertag}, Orange Alert! Unusual version of Minecraft and login time detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
    }
    return {embedColor, embedTitle, languageAlert, versionAlert, loginTimeAlert};
} else if (hypixelLanguage !== userLanguage) {
      var embedColor = ('#AA0000')
		  var embedTitle = ('**Unusual language detected!**')
      var languageAlert = true;
      var versionAlert = false;
      var loginTimeAlert = false;

		if (notificationred == true) {
		  alerts.send(`${playertag}, Red Alert! Unusual user language detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
    }
    return {embedColor, embedTitle, languageAlert, versionAlert, loginTimeAlert};
} else if (hoursLastLogin < globalThis.offlinehour) {
      var embedColor = ('#FFAA00')
		  var embedTitle = ('**Unusual login time detected!**')
      var languageAlert = false;
      var versionAlert = false;
      var loginTimeAlert = true;

		if (notificationorange == true) {
		  alerts.send(`${playertag}, Orange Alert! Unusual login time detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
    }
    return {embedColor, embedTitle, languageAlert, versionAlert, loginTimeAlert};
} else if (MCversion !== preferredMcVersion) {
      var embedColor = ('#FFAA00')
		  var embedTitle = ('**Unusual version detected!**')
      var languageAlert = false;
      var versionAlert = true;
      var loginTimeAlert = false;

		if (notificationorange == true) {
		  alerts.send(`${playertag}, Orange Alert! Unusual version of Minecraft detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
    }
    return {embedColor, embedTitle, languageAlert, versionAlert, loginTimeAlert};
} else {
	    var embedColor = ('#00AA00')
		  var embedTitle = ('**Nothing abnormal detected!**')
      var languageAlert = false;
      var versionAlert = false;
      var loginTimeAlert = false;
    return {embedColor, embedTitle, languageAlert, versionAlert, loginTimeAlert};
}
  };

    var embedData = useData();
    var embedColor = embedData.embedColor,
    embedTitle = embedData.embedTitle,
    languageAlert = embedData.languageAlert,
    versionAlert = embedData.versionAlert,
    loginTimeAlert = embedData.loginTimeAlert;

const embed = new Discord.MessageEmbed()
		.setColor(embedColor)
		.setTitle(embedTitle)
    .setThumbnail(`https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621`)
    .setFooter(`Log at ${datestring} | ${timestring}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e2/Feather_JE3_BE2.png/revision/latest/scale-to-width-down/160?cb=20190430052113')
    if (!status.session.online) {
    embed.addFields(
    { name: 'Status', value: `${playerName} is offline` },
    { name: 'Last Session', value: `Last Gametype was ${mostRecentGametype}\nLast Playtime was ${daysLastPlaytime}${hmsLastPlaytime} long | ${secLastPlaytime} seconds` },
    { name: 'Last Login and Logout', value: `Last Login was at ${offlineLastLogin.toLocaleString()} | ${daysofLastLogin}${hmsLastLogin} ago\nLast Logout was at ${offlineLastLogout.toLocaleString()} | ${daysofLastLogout}${hmsLastLogout} ago` })
  } else if (status.session.online) {
    embed.addFields(
		{ name: 'Status', value: `${playerName} is online` },
    { name: 'Gamemode', value: `Game: ${currentGametype}\nMode: ${gameMode}\nMap: ${map}` },
    { name: 'Session', value: `Playtime: ${daysofLastLogin}${hmsLastLogin} | ${secLastLogin} seconds\nLast Login: ${daysofLastLogin}${hmsLastLogin} | ${secLastLogin} seconds ago\nLast Logout: ${daysofLastLogout}${hmsLastLogout} | ${secLastLogout} seconds ago` })
    if (globalThis.relogtime !== undefined) embed.addFields(
    { name: 'Relog Time', value: `${globalThis.relogtime}` })
    if (languageAlert) embed.addField(`Unusual Language`, `__${userLanguage}__`, true)
    if (loginTimeAlert) embed.addField(`Unusual Login Time`, `__${timeOfLogin}\n${dateOfLogin}__`, true)
    if (versionAlert) embed.addField(`Unusual Version`, `__${MCversion}__`, true)
}
		log.send(embed);

		})
		.catch(error => console.log('Error', error) && consolelog.send('Error:', error)); //Error Checking
}
keepAlive()
client.login((process.env.TOKEN = discordAPIkey));
