const fs = require('fs');
const { prefix } = require('../../userConfig.json');
const funcImports = require( __dirname + '../../../functions');
module.exports = {
	name: 'red',
  aliases: ['ralert', 'r'],
	description: 'Toggles red alerts!',
  usage: `\`${prefix}red\``,
  cooldown: 1,
	execute(message, args, client) {

    var readData = funcImports.readAndLoadConfigData();
    var hypixelLanguage = readData.hypixelLanguage,
    preferredMcVersion = readData.preferredMcVersion,
    notificationorange = readData.notificationorange,
    notificationred = readData.notificationred,
    loginTimes = readData.loginTimes,
    whitelistedGames = readData.whitelistedGames,
    blacklistedGames = readData.blacklistedGames;


		if (notificationred == false) {
			var notificationred = true;
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, loginTimes, whitelistedGames, blacklistedGames)
      return notificationred.channel.send(`Red Alert notifications are now on!`);
		} else if (redtoggle == true) {
			var notificationred = false;
      var pauseTimeout = false;
      var pauseTime = 0;
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, loginTimes, whitelistedGames, blacklistedGames)
      return message.channel.send(`Red Alert notifications are now off!`);
		}
	},
};