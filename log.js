const userConfig = require('./userConfig.json')
const Discord = require('discord.js');
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

	try {
var readData = funcImports.readAndLoadConfigData();
    var hypixelLanguage = readData.hypixelLanguage,
    preferredMcVersion = readData.preferredMcVersion,
    notificationorange = readData.notificationorange,
    notificationred = readData.notificationred,
    loginTimes = readData.loginTimes,
    whitelistedGames = readData.whitelistedGames,
    blacklistedGames = readData.blacklistedGames;
  
  fetch(`https://api.hypixel.net/status?uuid=${playerUUID}&key=${hypixelAPIkey}`)
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

function secondsToD(seconds) { //calculating days from seconds
seconds1 = Number(seconds);
var d = Math.floor(seconds / (3600 * 24));
var dDisplay = d > 0 ? d + (d == 1 ? ' day ' : ' days ') : '';
return dDisplay;
}

    var newdate = new Date();
    var datestring = newdate.toLocaleDateString();
    var timestring = newdate.toLocaleTimeString();

    var daysofLastLogin = secondsToD((new Date() - player.player.lastLogin) / 1000);
    var daysofLastLogout = secondsToD((new Date() - player.player.lastLogout) / 1000);
    var daysofLastPlaytime = secondsToD((player.player.lastLogout - player.player.lastLogin) / 1000);

var timeOfLogin = new Date(player.player.lastLogin).toLocaleTimeString()
var dateOfLogin = new Date(player.player.lastLogin).toLocaleDateString()
var ceilRoundedLastLogin = Math.ceil((new Date() - player.player.lastLogin) / 1000)
var secLastLogin = Math.round((new Date() - player.player.lastLogin) / 1000);
var hmsLastLogin = new Date(Math.round(secLastLogin * 1000)).toISOString().substr(11, 8);

var ceilRoundedLastLogout = Math.ceil((new Date() - player.player.lastLogout) / 1000)
var secLastLogout = Math.round((new Date() - player.player.lastLogout) / 1000);
var hmsLastLogout = new Date(Math.round(secLastLogout * 1000)).toISOString().substr(11, 8);

var secLastPlaytime = Math.round((player.player.lastLogout - player.player.lastLogin) / 1000);
var hmsLastPlaytime = new Date(Math.round(secLastPlaytime * 1000)).toISOString().substr(11, 8);

let numberLogin = player.player.lastLogin * 1
let numberLogout = player.player.lastLogout * 1

var offlineLastLogin = new Date(new Date() - (new Date() - player.player.lastLogin));
var offlineLastLogout = new Date(new Date() - (new Date() - player.player.lastLogout));

var relogEventTime = (player.player.lastLogin - player.player.lastLogout) / 1000;

if (status.session.online || numberLogout < numberLogin && status.session.gameType !== undefined) {
var count = whitelistedGames.push("limbo", "main", "replay", "tournament", "prototype", "legacy")
var whitelistCheck = whitelistedGames.indexOf(status.session.gameType.toLowerCase())
}
if (status.session.online || numberLogout < numberLogin && status.session.gameType !== undefined) {
var blacklistCheck = blacklistedGames.indexOf(status.session.gameType.toLowerCase())
}


  function loginTimeFunc() {
      var loginTimep1 = loginTimes[0] * 1
      var loginTimep2 = loginTimes[1] * 1
      var hoursLastLogin = new Date(player.player.lastLogin).getHours();

        if (loginTimep1 < loginTimep2) {
          if (hoursLastLogin >= loginTimep1 && hoursLastLogin <= loginTimep2) return true;
          return false;
        } else if (loginTimep1 > loginTimep2) {
          if (hoursLastLogin >= loginTimep1 || hoursLastLogin <= loginTimep2) return true;
          return false;
        }
  }

    function events() {
        function relogEvent() {
        if (!executed && ceilRoundedLastLogin <= 10 && (relogEventTime < 10 && relogEventTime > 0)) {
          const shortSessionEmbed = new Discord.MessageEmbed()
                .setColor('#FFAA00')
                .setTitle('**Relog detected!**')
                .setFooter(`Alert at ${datestring} | ${timestring}`, 'http://www.pngall.com/wp-content/uploads/2017/05/Alert-Download-PNG.png')
            log.send(shortSessionEmbed);
            globalThis.executed = true;
            let roundedRelogTime = Math.round(relogEventTime * 100) / 100
            globalThis.relogtime = (`${roundedRelogTime} seconds`);
            function resetrelogevent() {
                globalThis.executed = false;
              }
            setTimeout(resetrelogevent, 10100);
          if (notificationorange == false) return true;
            alerts.send(`${playertag}, a relog was detected at ${timestring}. Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
            return true;
            }
        globalThis.relogtime = false;
        return false;
        }
        function shortSessionEvent() {
        if (!executed1 && !status.session.online && ceilRoundedLastLogout <= 20 && (secLastPlaytime < 10 && secLastPlaytime > 0)) {
          const shortSessionEmbed = new Discord.MessageEmbed()
                .setColor('#FFAA00')
                .setTitle('**Short Session detected!**')
                .setFooter(`Alert at ${datestring} | ${timestring}`, 'http://www.pngall.com/wp-content/uploads/2017/05/Alert-Download-PNG.png')
                .setDescription('Playtime was ${daysLastPlaytime}${hmsLastPlaytime}.')
            log.send(shortSessionEmbed);
            globalThis.executed1 = true;
            function resetshortevent() {
                globalThis.executed1 = false;
            }
            setTimeout(resetshortevent, 20100);
          if (notificationorange == false) return true;
            alerts.send(`${playertag}, a short session under 20 seconds was detected at ${timestring}. Playtime was ${daysofLastPlaytime}${hmsLastPlaytime}. Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
            return true;
            }
        return false;
        }
        
            if (relogEvent() || shortSessionEvent()) return;

            if (ceilRoundedLastLogin <= 10) { //Sends msg to discord notif on login
              const loginEmbed = new Discord.MessageEmbed()
                  .setColor('#00AA00')
                  .setTitle('**Login detected!**')
                .setFooter(`Alert at ${datestring} | ${timestring}`, 'http://www.pngall.com/wp-content/uploads/2017/05/Alert-Download-PNG.png')
                  .setDescription(`A login at ${offlineLastLogin.toLocaleTimeString()} was detected .`);
                log.send(loginEmbed);
              if (notificationorange == false) return;
                alerts.send(`${playertag}, a new login at ${offlineLastLogin.toLocaleTimeString()} was detected at ${timestring}.`, {tts: true});
                }
          
             if (ceilRoundedLastLogout <= 10) { //Sends msg to discord notif on logout
              const logoutEmbed = new Discord.MessageEmbed()
                  .setColor('#555555')
                  .setTitle('**Logout detected!**')
                .setFooter(`Alert at ${datestring} | ${timestring}`, 'http://www.pngall.com/wp-content/uploads/2017/05/Alert-Download-PNG.png')
                  .setDescription(`A logout at ${offlineLastLogout.toLocaleTimeString()} was detected at ${timestring}. Playtime was ${daysofLastPlaytime}${hmsLastPlaytime}`);
                log.send(logoutEmbed);
              if (notificationorange == false) return;
                alerts.send(`${playertag}, a logout at ${offlineLastLogout.toLocaleTimeString()} was detected. Playtime was ${daysofLastPlaytime}${hmsLastPlaytime}`, {tts: true});
                } 
    }
    events();

function useData() {

if (!status.session.online && numberLogout > numberLogin) {
var embedColor = ('#555555')
var isAlert = false;
var languageAlert = false;
var versionAlert = false;
var loginTimeAlert = false;
var gametypeAlert = false;

return {embedColor, isAlert, languageAlert, versionAlert, loginTimeAlert, gametypeAlert};
}

var embedColor = ('#00AA00')
var languageAlert = false;
var versionAlert = false;
var loginTimeAlert = false;
var gametypeAlert = false;

if (whitelistCheck == -1 && status.session.online) {
var embedColor = ('#FFAA00')
var isAlert = true
var gametypeAlert = true;
if (blacklistCheck !== -1 && status.session.online) {
if (notificationred == true) {
alerts.send(`${playertag}, Red Alert! Blacklisted game type detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
}
} else if (notificationorange == true) {
alerts.send(`${playertag}, Orange Alert! Non-whitelisted game type detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
}
}
if (loginTimeFunc() == true) {
var embedColor = ('#FFAA00')
var isAlert = true
var loginTimeAlert = true;

if (notificationorange == true) {
alerts.send(`${playertag}, Orange Alert! Unusual login time detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
}
}
if (player.player.mcVersionRp !== preferredMcVersion && player.player.mcVersionRp) {
var embedColor = ('#FFAA00')
var isAlert = true
var versionAlert = true;

if (notificationorange == true) {
alerts.send(`${playertag}, Orange Alert! Unusual version of Minecraft detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
}
}
if (hypixelLanguage !== player.player.userLanguage) {
var embedColor = ('#AA0000')
var isAlert = true
var languageAlert = true;

if (notificationred == true) {
alerts.send(`${playertag}, Red Alert! Unusual user language detected! Please ensure your account is secure. <https://bit.ly/3f7gdBf>`, {tts: true});
}
}
if (blacklistCheck !== -1 && status.session.online) {
var embedColor = ('#AA0000')
var isAlert = true
var gametypeAlert = true;
}


return {embedColor, isAlert, languageAlert, versionAlert, loginTimeAlert, gametypeAlert};
};

var embedData = useData();
var embedColor = embedData.embedColor,
isAlert = embedData.isAlert,
languageAlert = embedData.languageAlert,
versionAlert = embedData.versionAlert,
loginTimeAlert = embedData.loginTimeAlert,
gametypeAlert = embedData.gametypeAlert;

const embed = new Discord.MessageEmbed()
.setColor(embedColor)
.setTitle(`${!status.session.online && numberLogout > numberLogin ? `**Offline!**` : `${isAlert ? `**Unusual activity detected!**` : `**Nothing abnormal detected!**` }` }`)
.setFooter(`${isAlert == true ? `Alert at ${datestring} | ${timestring}` : `Log at ${datestring} | ${timestring}` }`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621')
if (!status.session.online && numberLogout > numberLogin) {
    embed.addFields(
    { name: 'Status', value: `${player.player.displayname} is offline` },
    { name: 'Last Session', value: `${player.player.lastLogin ? `Last Playtime: ${daysofLastPlaytime}${hmsLastPlaytime} long` : `Playtime: Unknown`}\n${player.player.mostRecentGameType ? `Last Gametype: ${player.player.mostRecentGameType}` : `Last Gametype: Unknown` }` },
    { name: 'Last Login', value: `${player.player.lastLogin ? `Last Login: ${offlineLastLogin.toLocaleString()}\n${daysofLastLogin}${hmsLastLogin} ago` : `Unknown` }` },
    { name: 'Last Logout', value: `${player.player.lastLogout ? `Last Logout: ${offlineLastLogout.toLocaleString()}\n${daysofLastLogout}${hmsLastLogout} ago` : `Unknown` }` },
    { name: 'Settings', value: `${player.player.userLanguage ? `Language: ${player.player.userLanguage}` : `Language: Unknown` }\n${player.player.mcVersionRp ? `Version: ${player.player.mcVersionRp}` : `Version: Unknown` }` });
  } else if (status.session.online || numberLogout < numberLogin) {
    embed.addFields(
		  { name: 'Status', value: `${player.player.displayname} is online` },
      { name: 'Session', value: `${player.player.lastLogin ? `Playtime: ${daysofLastLogin}${hmsLastLogin}` : `Playtime: Unknown`}\n${status.session.gameType ? `Game: ${status.session.gameType}\n` : `` }${status.session.mode ? `Mode: ${status.session.mode}\n` : `` }${status.session.map ? `Map: ${status.session.map}` : `` }${!status.session.gameType && !status.session.mode && !status.session.map ? `Data not available: Limited API!` : `` }` },
      { name: 'Last Login', value: `${player.player.lastLogin ? `Last Login: ${new Date(player.player.lastLogin).toLocaleString()}\n${daysofLastLogin}${hmsLastLogin}` : `Last Login: Unknown`}` },
      { name: 'Last Logout', value: `${player.player.lastLogout ? `Last Logout: ${new Date(player.player.lastLogout).toLocaleString()}\n${daysofLastLogout}${hmsLastLogout}` : `Last Logout: Unknown`}` },
      { name: 'Settings', value: `${player.player.userLanguage ? `Language: ${player.player.userLanguage}` : `Language: Unknown` }\n${player.player.mcVersionRp ? `Version: ${player.player.mcVersionRp}` : `Version: Unknown` }` });
        if (!status.session.online && numberLogout < numberLogin) embed.addField(`**API Limitation**`, `The Online Status API must be on\nfor Gametype data and alerts to \nfunction. Please turn it on.`);
        if (globalThis.relogtime !== undefined && globalThis.relogtime) embed.addField(`Relog Time`, `**${globalThis.relogtime ? `${globalThis.relogtime}` : `Somethiing went wrong!` }**`);
        if (languageAlert) embed.addField(`**Unusual Language**`, `**${player.player.userLanguage ? `${player.player.userLanguage}` : `Unknown` }**`, true);
        if (loginTimeAlert) embed.addField(`**Unusual Login Time**`, `**${player.player.lastLogin ? `${timeOfLogin}\n${dateOfLogin}` : `Unknown` }**`, true);
        if (gametypeAlert && status.session.online) embed.addField(`**Unusual Game Type**`, `**${status.session.gameType ? `${status.session.gameType}` : `Unknown` }**`, true);
        if (versionAlert) embed.addField(`**Unusual Version**`, `**${player.player.mcVersionRp ? `${player.player.mcVersionRp}` : `Unknown` }**`, true);
}
log.send(embed);
    })
} catch (error) {
  if (error instanceof TypeError) {
    console.log(`TypeError: ${error}`)
    const typeError = new Discord.MessageEmbed()
            .setColor('#AA0000')
            .setTitle('**Error In Fetching Data**')
            .setFooter(`Error at ${datestring} | ${timestring}`, 'http://www.pngall.com/wp-content/uploads/2017/05/Alert-Download-PNG.png')
            .setDescription(`This error is expected to happen occasionally. Please report this to the bot owner if this continues for more than a minute.`)
            .addField('Error', `${error}`);
          log.send(typeError);
  } else if (error instanceof FetchError) {
    console.log(`TypeError: ${error}`)
    const typeError = new Discord.MessageEmbed()
            .setColor('#AA0000')
            .setTitle('**Error In Fetching Data**')
            .setFooter(`Error at ${datestring} | ${timestring}`, 'http://www.pngall.com/wp-content/uploads/2017/05/Alert-Download-PNG.png')
            .setDescription(`This error is expected to happen occasionally. Please report this to the bot owner if this continues for more than a minute.`)
            .addField('Error', `${error}`);
          log.send(typeError);
  } else {
    console.log(`Error: ${error}`)
  }
}
}

module.exports = { logFunction };