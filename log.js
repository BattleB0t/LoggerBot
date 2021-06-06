const userConfig = require('./userConfig.json')
const Discord = require('discord.js');
const prefix = userConfig["prefix"]
const playerID = userConfig["PlayerTagID"]
const playertag = (`<@${playerID}>`)
const fetch = require('node-fetch');
const funcImports = require('./functions');
const fs = require('fs');
process.env.TZ = userConfig["Timezone"];

globalThis.executed = false;
globalThis.executed1 = false;

function logFunction(client, playerUUID, hypixelAPIkey, logID, alertID) {
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
    pauseTimeout = readData.pauseTimeout,
    alertTimeout = readData.alertTimeout,
    loginTimes = readData.loginTimes;

	fetch(`https://api.hypixel.net/status?uuid=${playerUUID}&key=${hypixelAPIkey}`) //i dont think this is promise based but it works
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			status = data;
			return fetch(`https://api.hypixel.net/player?uuid=${playerUUID}&key=${hypixelAPIkey}`);
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

            var daysofLastLogin = secondsToDLastLogin((new Date() - player.player.lastLogin) / 1000);
            var daysofLastLogout = secondsToDLastLogout((new Date() - player.player.lastLogout) / 1000);
            var daysLastPlaytime = secondsToDLastPlaytime((player.player.lastLogout - player.player.lastLogin) / 1000);

            var mostRecentGametype = player.player.mostRecentGameType
            var currentGametype = status.session.gameType //can only be used when player is online
            var gameMode = status.session.mode
            var map = status.session.map //map of the game, eg: tribute on skywars

      var timeOfLogin = new Date(player.player.lastLogin).toLocaleTimeString()
      var dateOfLogin = new Date(player.player.lastLogin).toLocaleDateString()
      var ceilRoundedLastLogin = Math.ceil(new Date() - player.player.lastLogin) / 1000
      var secLastLogin = Math.round((new Date() - player.player.lastLogin) / 1000);
	    var hmsLastLogin = new Date(Math.round(secLastLogin * 1000)).toISOString().substr(11, 8);

      var ceilRoundedLastLogout = Math.ceil(new Date() - player.player.lastLogout) / 1000
			var secLastLogout = Math.round((new Date() - player.player.lastLogout) / 1000);
			var hmsLastLogout = new Date(Math.round(secLastLogout * 1000)).toISOString().substr(11, 8);

			var secLastPlaytime = Math.round((player.player.lastLogout - player.player.lastLogin) / 1000);
			var hmsLastPlaytime = new Date(Math.round(secLastPlaytime * 1000)).toISOString().substr(11, 8);

			var offlineLastLogin = new Date(new Date() - (new Date() - player.player.lastLogin));
			var offlineLastLogout = new Date(new Date() - (new Date() - player.player.lastLogout));

			var MCversion = player.player.mcVersionRp; //Version of Minecraft
			var userLanguage = player.player.userLanguage; //Language

      var relogEventTime = (player.player.lastLogin - player.player.lastLogout) / 1000;


          function loginTimeFunc() {
              var loginTimep1 = loginTimes[0]
              var loginTimep2 = loginTimes[1]
              var hoursLastLogin = new Date(player.player.lastLogin).getHours();
              console.log(loginTimep1, loginTimep2, hoursLastLogin)

                if (loginTimep1 < loginTimep2) {
                  if (hoursLastLogin >= loginTimep1 && hoursLastLogin <= loginTimep2) return true
                  return false
                } else if (loginTimep1 > loginTimep2) {
                  if (hoursLastLogin >= loginTimep1 || hoursLastLogin <= loginTimep2) return true
                  return false
                }
          }

            function events() {
                function relogEvent() {
                if (!executed && notificationorange == true && ceilRoundedLastLogin <= 10 && (relogEventTime < 10 && relogEventTime > 0)) {
                    globalThis.executed = true;
                    var roundedRelogTime = Math.round(relogEventTime * 100) / 100
                    globalThis.relogtime = (`${roundedRelogTime} seconds`);
                    const shortSessionEmbed = new Discord.MessageEmbed()
                        .setColor('#FFAA00')
                        .setTitle('**Relog detected!**')
                        .setFooter(`Alert at ${datestring} | ${timestring}`, 'http://www.pngall.com/wp-content/uploads/2017/05/Alert-Download-PNG.png')
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
                if (!executed1 && notificationorange == true && !status.session.online && ceilRoundedLastLogout <= 20 && (secLastPlaytime < 10 && secLastPlaytime > 0)) {
                    globalThis.executed1 = true;
                    const shortSessionEmbed = new Discord.MessageEmbed()
                        .setColor('#FFAA00')
                        .setTitle('**Short Session detected!**')
                        .setFooter(`Alert at ${datestring} | ${timestring}`, 'http://www.pngall.com/wp-content/uploads/2017/05/Alert-Download-PNG.png')
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

                    if (ceilRoundedLastLogin <= 10 && notificationorange == true) { //Sends msg to discord notif on login
                      const loginEmbed = new Discord.MessageEmbed()
                          .setColor('#00AA00')
                          .setTitle('**Login detected!**')
                        .setFooter(`Alert at ${datestring} | ${timestring}`, 'http://www.pngall.com/wp-content/uploads/2017/05/Alert-Download-PNG.png')
                          .setDescription(`A login at ${offlineLastLogin.toLocaleTimeString()} was detected .`);
                        log.send(loginEmbed);
                        alerts.send(`${playertag}, a new login at ${offlineLastLogin.toLocaleTimeString()} was detected at ${timestring}.`, {tts: true});
                        }
                  
                     if (ceilRoundedLastLogout <= 10 && notificationorange == true) { //Sends msg to discord notif on logout
                      const logoutEmbed = new Discord.MessageEmbed()
                          .setColor('#555555')
                          .setTitle('**Logout detected!**')
                        .setFooter(`Alert at ${datestring} | ${timestring}`, 'http://www.pngall.com/wp-content/uploads/2017/05/Alert-Download-PNG.png')
                          .setDescription(`A logout at ${offlineLastLogout.toLocaleTimeString()} was detected at ${timestring}.`);
                        log.send(logoutEmbed);
                        alerts.send(`${playertag}, a logout at ${offlineLastLogout.toLocaleTimeString()} was detected. Playtime was ${daysLastPlaytime}${hmsLastPlaytime}`, {tts: true});
                        } 
            }
            events();

  function useData() {

if (!status.session.online) {
	    var embedColor = ('#555555')
		  var embedTitle = ('**Offline!**')
      var embedFooter = (`Log at ${datestring} | ${timestring}`)
      var languageAlert = false;
      var versionAlert = false;
      var loginTimeAlert = false;

    return {embedColor, embedTitle, embedFooter, languageAlert, versionAlert, loginTimeAlert};
	}

if (hypixelLanguage !== userLanguage && MCversion !== preferredMcVersion && loginTimeFunc() == true) {
		  var embedColor = ('#AA0000')
		  var embedTitle = ('**Unusual language, version, and login time detected!**')
      var embedFooter = (`Alert at ${datestring} | ${timestring}`)
      var languageAlert = true;
      var versionAlert = true;
      var loginTimeAlert = true;

		if (notificationred == true) {
		  alerts.send(`${playertag}, Red Alert! Unusual language, version, and login time detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
		}
    return {embedColor, embedTitle, embedFooter, languageAlert, versionAlert, loginTimeAlert};
} else if (hypixelLanguage !== userLanguage && loginTimeFunc() == true) {
      var embedColor = ('#AA0000')
		  var embedTitle = ('**Unusual language and login time detected!**')
      var embedFooter = (`Alert at ${datestring} | ${timestring}`)
      var languageAlert = true;
      var versionAlert = false;
      var loginTimeAlert = true;

		if (notificationred == true) {
		  alerts.send(`${playertag}, Red Alert! Unusual user language and login time detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
    }
    return {embedColor, embedTitle, embedFooter, languageAlert, versionAlert, loginTimeAlert};
} else if (MCversion !== preferredMcVersion && hypixelLanguage !== userLanguage) {
      var embedColor = ('#AA0000')
		  var embedTitle = ('**Unusual language and version detected!**')
      var embedFooter = (`Alert at ${datestring} | ${timestring}`)
      var languageAlert = true;
      var versionAlert = true;
      var loginTimeAlert = false;

		if (notificationred == true) {
		  alerts.send(`${playertag}, Red Alert! Unusual user language and version of Minecraft detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
    }
    return {embedColor, embedTitle, embedFooter, languageAlert, versionAlert, loginTimeAlert};
} else if (MCversion !== preferredMcVersion && loginTimeFunc() == true) {
      var embedColor = ('#FFAA00')
		  var embedTitle = ('**Unusual version and login time detected!**')
      var embedFooter = (`Alert at ${datestring} | ${timestring}`)
      var languageAlert = false;
      var versionAlert = true;
      var loginTimeAlert = true;

		if (notificationorange == true) {
		  alerts.send(`${playertag}, Orange Alert! Unusual version of Minecraft and login time detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
    }
    return {embedColor, embedTitle, embedFooter, languageAlert, versionAlert, loginTimeAlert};
} else if (hypixelLanguage !== userLanguage) {
      var embedColor = ('#AA0000')
		  var embedTitle = ('**Unusual language detected!**')
      var embedFooter = (`Alert at ${datestring} | ${timestring}`)
      var languageAlert = true;
      var versionAlert = false;
      var loginTimeAlert = false;

		if (notificationred == true) {
		  alerts.send(`${playertag}, Red Alert! Unusual user language detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
    }
    return {embedColor, embedTitle, embedFooter, languageAlert, versionAlert, loginTimeAlert};
} else if (loginTimeFunc() == true) {
      var embedColor = ('#FFAA00')
		  var embedTitle = ('**Unusual login time detected!**')
      var embedFooter = (`Alert at ${datestring} | ${timestring}`)
      var languageAlert = false;
      var versionAlert = false;
      var loginTimeAlert = true;

		if (notificationorange == true) {
		  alerts.send(`${playertag}, Orange Alert! Unusual login time detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
    }
    return {embedColor, embedTitle, embedFooter, languageAlert, versionAlert, loginTimeAlert};
} else if (MCversion !== preferredMcVersion) {
      var embedColor = ('#FFAA00')
		  var embedTitle = ('**Unusual version detected!**')
      var embedFooter = (`Alert at ${datestring} | ${timestring}`)
      var languageAlert = false;
      var versionAlert = true;
      var loginTimeAlert = false;

		if (notificationorange == true) {
		  alerts.send(`${playertag}, Orange Alert! Unusual version of Minecraft detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
    }
    return {embedColor, embedTitle, embedFooter, languageAlert, versionAlert, loginTimeAlert};
} else {
	    var embedColor = ('#00AA00')
		  var embedTitle = ('**Nothing abnormal detected!**')
      var embedFooter = (`Log at ${datestring} | ${timestring}`)
      var languageAlert = false;
      var versionAlert = false;
      var loginTimeAlert = false;
    return {embedColor, embedTitle, embedFooter, languageAlert, versionAlert, loginTimeAlert};
}
  };

    var embedData = useData();
    var embedColor = embedData.embedColor,
    embedFooter = embedData.embedFooter,
    embedTitle = embedData.embedTitle,
    languageAlert = embedData.languageAlert,
    versionAlert = embedData.versionAlert,
    loginTimeAlert = embedData.loginTimeAlert;

const embed = new Discord.MessageEmbed()
		.setColor(embedColor)
		.setTitle(embedTitle)
    .setFooter(embedFooter, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621')
    if (!status.session.online) {
    embed.addFields(
    { name: 'Status', value: `${playerName} is offline` },
    { name: 'Last Session', value: `${player.player.mostRecentGametype !== undefined ? `Game: ${mostRecentGametype}\n` : `` }\nLast Playtime: ${daysLastPlaytime}${hmsLastPlaytime} long` },
    { name: 'Last Login', value: `Last Login: ${offlineLastLogin.toLocaleString()}\n${daysofLastLogin}${hmsLastLogin} ago` },
    { name: 'Last Logout', value: `Last Logout: ${offlineLastLogout.toLocaleString()}\n${daysofLastLogout}${hmsLastLogout} ago` })
  } else if (status.session.online) {
    embed.addFields(
		{ name: 'Status', value: `${playerName} is online` },
    { name: 'Gamemode', value: `${status.session.gameType !== undefined ? `Game: ${currentGametype}\n` : `` }${status.session.mode !== undefined ? `Mode: ${gameMode}\n` : `` }${status.session.map !== undefined ? `Map: ${map}` : `` }` },
    { name: 'Session', value: `Playtime: ${daysofLastLogin}${hmsLastLogin}\nLast Login: ${daysofLastLogin}${hmsLastLogin}\nLast Logout: ${daysofLastLogout}${hmsLastLogout}` })
    if (globalThis.relogtime !== undefined) embed.addFields(
    { name: 'Relog Time', value: `${globalThis.relogtime}` })
    if (languageAlert) embed.addField(`Unusual Language`, `__${userLanguage}__`, true)
    if (loginTimeAlert) embed.addField(`Unusual Login Time`, `__${timeOfLogin}\n${dateOfLogin}__`, true)
    if (versionAlert) embed.addField(`Unusual Version`, `__${MCversion}__`, true)
}
		log.send(embed);

		})
		.catch(error => console.log('Error', error)); //Error Checking
}

module.exports = { logFunction };