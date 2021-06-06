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
    notiftoggle = readData.notiftoggle,
    orangetoggle = readData.orangetoggle,
    redtoggle = readData.redtoggle,
    epochOfPause = readData.epochOfPause,
    pauseTime = readData.pauseTime,
    pauseTimeout = readData.pauseTimeout,
    alertTimeout = readData.alertTimeout,
    loginTimes = readData.loginTimes;

		if (redtoggle == true) {
			message.channel.send(`Red Alert notifications are now on!`);
			var notificationred = true;
			var redtoggle = false;
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout, loginTimes)
		} else if (redtoggle == false) {
			message.channel.send(`Red Alert notifications are now off!`);
			var notificationred = false;
      clearTimeout(globalThis.pauseAction)
      var pauseTimeout = false;
      var pauseTime = 0;
			var redtoggle = true;
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout, loginTimes)
		}
	},
};