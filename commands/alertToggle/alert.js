const fs = require('fs');
const { prefix } = require('../../userConfig.json');
const funcImports = require( __dirname + '../../../functions');
module.exports = {
	name: 'alert',
  aliases: ['pleaseshutup', 'psu'],
	description: 'Toggle all alerts!',
  usage: `\`${prefix}alert\``,
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


		if (notificationorange == false || notificationorange == false) {
      var notificationorange = true;
			var notificationred = true;
			var notiftoggle = false;
      var orangetoggle = false;
      var redtoggle = false;
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, loginTimes, whitelistedGames, blacklistedGames);
			return message.channel.send(`All notifications are now on!`);
		} else if (notificationorange == true && notificationred == true) {
      var notificationorange = false;
			var notificationred = false;
      clearTimeout(globalThis.pauseAction)
      var pauseTimeout = false;
      var pauseTime = 0;
			var notiftoggle = true;
      var orangetoggle = true;
      var redtoggle = true;
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, loginTimes, whitelistedGames, blacklistedGames);
			return message.channel.send(`All notifications are now off!`);
		}
	},
};