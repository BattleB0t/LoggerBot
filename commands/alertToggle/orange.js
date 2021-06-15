const fs = require('fs');
const { prefix } = require('../../userConfig.json');
const funcImports = require( __dirname + '../../../functions');
module.exports = {
	name: 'orange',
  aliases: ['oalert', 'o'],
	description: 'Toggles orange alerts!',
  usage: `\`${prefix}orange\``,
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


		if (notificationorange == false) {
      var notificationorange = true;
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, loginTimes, whitelistedGames, blacklistedGames)
			return message.channel.send(`Orange Alert notifications are now on!`);
		} else if (notificationorange == true) {
      var notificationorange = false;
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, loginTimes, whitelistedGames, blacklistedGames)
			return message.channel.send(`Orange Alert notifications are now off!`);
		}
	},
};