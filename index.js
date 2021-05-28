const keepAlive = require('./server');
const fs = require('fs');
const funcImports = require('./functions');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const hypixelAPIkey = process.env['Hypixel'];
const client = new Discord.Client
const { prefix } = require('./userConfig.json');
const discordAPIkey = process.env['DiscordAPIkey'];
const userConfig = require('./userConfig.json')
const uuid = userConfig["MinecraftUUID"];
const logID = "846935851320999936" //userConfig["LogChannel"];
const alertID = "846935876609376266" //userConfig["NotificationsAndAlerts"];
const startupID = "838581014329950279" //userConfig["StartupNotification"];
const playerID = userConfig["PlayerTagID"]
const playertag = (`<@${playerID}>`)
process.env.TZ = userConfig["Timezone"];
client.commands = new Discord.Collection();

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
      {name: 'Status', value: 'LoggerBot was restarted and is now online'},
      { name: 'Link', value: 'https://DiscordLogger.botguy123.repl.co' },
      )
		.setFooter('Bot by Attituding');
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
	const command = args.shift().toLowerCase();


	if (!client.commands.has(command)) return;
  if (command.guildOnly && message.channel.type === 'dm') return message.reply('I can\'t execute that command inside DMs!');
	
  if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		client.commands.get(command).execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

setInterval(myMethod, 10000); //Timer function, moving it to a seperate file might be a good idea

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
            var secLastLogin = Math.round((new Date() - player.player.lastLogin) / 1000);
	        var hmsLastLogin = new Date(Math.round(secLastLogin * 1000)).toISOString().substr(11, 8);

            var msLastLogout = (new Date() - player.player.lastLogout) / 1000
			var secLastLogout = Math.round((new Date() - player.player.lastLogout) / 1000);
			var hmsLastLogout = new Date(Math.round(secLastLogout * 1000)).toISOString().substr(11, 8);

			var secLastPlaytime = (player.player.lastLogout - player.player.lastLogin) / 1000;
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
                    globalThis.relogtime = (`${relogEventTime} seconds`);
                    const shortSessionEmbed = new Discord.MessageEmbed()
                        .setColor('#FFAA00')
                        .setTitle('Relog detected!')
                        .setDescription(`\`\`\`\nRelog detected at ${timestring}\n\`\`\``);
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
                        .setTitle('Short Session detected!')
                        .setDescription(`\`\`\`\nShort Session detected at ${timestring}\n\`\`\``);
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
                          .setTitle('Login detected!')
                          .setDescription(`\`\`\`\nLogin at ${offlineLastLogin.toLocaleTimeString()} was detected at ${timestring}.\n\`\`\``);
                        log.send(loginEmbed);
                        alerts.send(`${playertag}, a new login at ${offlineLastLogin.toLocaleTimeString()} was detected at ${timestring}.`, {tts: true});
                        }
                  
                     if (msLastLogout <= 10 && notificationorange == true) { //Sends msg to discord notif on logout
                      const logoutEmbed = new Discord.MessageEmbed()
                          .setColor('#555555')
                          .setTitle('Logout detected!')
                          .setDescription(`\`\`\`\nLogout at ${offlineLastLogout.toLocaleTimeString()} was detected at ${timestring}.\n\`\`\``);
                        log.send(logoutEmbed);
                        alerts.send(`${playertag}, a logout at ${offlineLastLogout.toLocaleTimeString()} was detected at ${timestring}.`, {tts: true});
                        } 
            }
            events();

      var Log_at = (`Log at ${datestring} | ${timestring}`)
      var Status_online = (`Status: Online`)
      var Game_type = (`Gametype: ${currentGametype}`)
      var Game_mode = (`Mode: ${gameMode}`)
      var Game_map = (`Map: ${map}`)
      var P_name = (`Name: ${playerName}`)
      var L_playtime = (`Last Playtime was ${daysLastPlaytime}${hmsLastPlaytime} long`)
      var P_playtime = (`Playtime: ${daysofLastLogin}${hmsLastLogin} - ${secLastLogin} seconds`)
      var P_relogtime = (`Last relog time: ${globalThis.relogtime}`)
      var P_lastlogin = (`Last Login: ${daysofLastLogin}${hmsLastLogin} - ${secLastLogin} seconds ago`)
      var P_lastlogout = (`Last Logout: ${daysofLastLogout}${hmsLastLogout} - ${secLastLogout} seconds ago`)
      //i am 100% sure this can be simplified, and this if else ladder looks inefficient.
      if (!status.session.online) { //haha guard clause go brrrr
        const offlineEmbed = new Discord.MessageEmbed()
            .setColor('#555555')
            .setTitle('Offline!')
            .setDescription(`\`\`\`\n${Log_at}\nStatus: Offline\nMost recent Gametype: ${mostRecentGametype}\n${L_playtime}\nLast Login was at ${offlineLastLogin.toLocaleString()} - ${daysofLastLogin}${hmsLastLogin} ago\nLast Logout was at ${offlineLastLogout.toLocaleString()} - ${daysofLastLogout}${hmsLastLogout} ago\n\`\`\``);
            log.send(offlineEmbed);
            return;
      }

      if (hypixelLanguage !== userLanguage && MCversion !== preferredMcVersion && hoursLastLogin < globalThis.offlinehour) {
          const level1Embed = new Discord.MessageEmbed()
              .setColor('#AA0000')
              .setTitle('Unusual language, version, and login time detected!')
              .setURL('https://account.mojang.com/me/settings')
              .setDescription(`\`\`\`\n${Log_at}\n${Status_online} - Unusual time!\n${Game_type}\n${Game_mode}\n${Game_map}\n${P_name}\nUNUSUAL VERSION AND LANGUAGE: ${userLanguage}, ${MCversion}\n${P_playtime}\n${P_relogtime}\n${P_lastlogin}\n${P_lastlogout}\n\`\`\``);
              log.send(level3Embed);
            if (notificationred == true) {
              alerts.send(`${playertag}, Red Alert! Unusual language, version, and login time detected! Security options: <https://bit.ly/3f7gdBf>`, {tts: true});
            }
        } else if (hypixelLanguage !== userLanguage && hoursLastLogin < globalThis.offlinehour) {
          const level2Embed = new Discord.MessageEmbed()
              .setColor('#AA0000')
              .setTitle('Unusual language and login time detected!')
              .setURL('https://account.mojang.com/me/settings')
              .setDescription(`\`\`\`\n${Log_at}\n${Status_online} - Unusual time!\n${Game_type}\n${Game_mode}\n${Game_map}\n${P_name}\nUNUSUAL LANGUAGE: ${userLanguage}\n${P_playtime}\n${P_relogtime}\n${P_lastlogin}\n${P_lastlogout}\n\`\`\``);
              log.send(level2Embed);
            if (notificationred == true) {
              alerts.send(`${playertag}, Red Alert! Unusual language and login time detected! Security options: <https://bit.ly/3f7gdBf>`, {tts: true});
      }
        } else if (MCversion !== preferredMcVersion && hypixelLanguage !== userLanguage) {
          const level2Embed = new Discord.MessageEmbed()
            .setColor('#AA0000')
            .setTitle('Unusual language and version detected!')
            .setURL('https://account.mojang.com/me/settings')
            .setDescription(`\`\`\`\n${Log_at}\n${Status_online}\n${Game_type}\n${Game_mode}\n${Game_map}\n${P_name}\nUNUSUAL LANGUAGE AND VERSION: ${userLanguage}, ${MCversion}\n${P_playtime}\n${P_relogtime}\n${P_lastlogin}\n${P_lastlogout}\n\`\`\``);
            log.send(level2Embed);
          if (notificationred == true) {
            alerts.send(`${playertag}, Red Alert! Unusual language and version detected! Security options: <https://bit.ly/3f7gdBf>`, {tts: true});
     }
        } else if (MCversion !== preferredMcVersion && hoursLastLogin < globalThis.offlinehour) {
          const level2Embed = new Discord.MessageEmbed()
            .setColor('#FFAA00')
            .setTitle('Unusual version and login time detected!')
            .setURL('https://account.mojang.com/me/settings')
            .setDescription(`\`\`\`\n${Log_at}\n${Status_online}\n${Game_type}\n${Game_mode}\n${Game_map}\n${P_name}\nUNUSUAL VERSION: ${MCversion}\n${P_playtime}\n${P_relogtime}\n${P_lastlogin}\n${P_lastlogout}\n\`\`\``);
            log.send(level1Embed);
          if (notificationorange == true) {
            alerts.send(`${playertag}, Orange Alert! Unusual version and login time detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
     }
        } else if (hypixelLanguage !== userLanguage) {
          const level3Embed = new Discord.MessageEmbed()
            .setColor('#AA0000')
            .setTitle('Unusual language detected!')
            .setURL('https://account.mojang.com/me/settings')
            .setDescription(`\`\`\`\n${Log_at}\n${Status_online}\n${Game_type}\n${Game_mode}\n${Game_map}\n${P_name}\nUNUSUAL LANGUAGE: ${userLanguage}\n${P_playtime}\n${P_relogtime}\n${P_lastlogin}\n${P_lastlogout}\n\`\`\``);
            log.send(level3Embed);
          if (notificationred == true) {
            alerts.send(`${playertag}, Red Alert! Unusual language detected! Security options: <https://bit.ly/3f7gdBf>`, {tts: true});
      }
        } else if (hoursLastLogin < globalThis.offlinehour) {
          const level3Embed = new Discord.MessageEmbed()
          .setColor('#FFAA00')
          .setTitle('Unusual login time detected!')
          .setURL('https://account.mojang.com/me/settings')
          .setDescription(`\`\`\`\n${Log_at}\n${Status_online}\n${Game_type}\n${Game_mode}\n${Game_map}\n${P_name}\n${P_playtime}\n${P_relogtime}\n${P_lastlogin}\n${P_lastlogout}\n\`\`\``);
          log.send(level3Embed);
        if (notificationorange == true) {
          alerts.send(`${playertag}, Orange Alert! Unusual login time detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
      }
        } else if (MCversion !== preferredMcVersion) {
          const level3Embed = new Discord.MessageEmbed()
            .setColor('#FFAA00')
            .setTitle('Unusual version detected!')
            .setURL('https://account.mojang.com/me/settings')
            .setDescription(`\`\`\`\n${Log_at}\n${Status_online}\n${Game_type}\n${Game_mode}\n${Game_map}\n${P_name}\nUNUSUAL VERSION: ${MCversion}\n${P_playtime}\n${P_relogtime}\n${P_lastlogin}\n${P_lastlogout}\n\`\`\``);
            log.send(level3Embed);
          if (notificationorange == true) {
            alerts.send(`${playertag}, Orange Alert! Unusual version detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
      }
        } else {
          const level4Embed = new Discord.MessageEmbed()
            .setColor('#00AA00')
            .setTitle('Nothing abnormal detected!')
            .setDescription(`\`\`\`\n${Log_at}\n${Status_online}\n${Game_type}\n${Game_mode}\n${Game_map}\n${P_name}\n${P_playtime}\n${P_relogtime}\n${P_lastlogin}\n${P_lastlogout}\n\`\`\``);
            log.send(level4Embed);
        }
    

		})
		.catch(error => console.log('Error', error) && consolelog.send('Error:', error)); //Error Checking
}
keepAlive()
client.login((process.env.TOKEN = discordAPIkey));
