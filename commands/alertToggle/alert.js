const fs = require('fs');
const { prefix } = require('../../userConfig.json');
const funcImports = require( __dirname + '../../../functions');
module.exports = {
	name: 'alert',
  aliases: ['pleaseshutup', 'psu'],
	description: 'Toggle all alerts!',
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
    pauseTimeout = readData.pauseTimeout;

		if (notiftoggle == true) {
      var notificationorange = true;
			var notificationred = true;
			var notiftoggle = false;
      var orangetoggle = false;
      var redtoggle = false;
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout)
			message.channel.send(`All notifications are now on!`);
		} else if (notiftoggle == false) {
      var notificationorange = false;
			var notificationred = false;
      clearTimeout(globalThis.pauseAction)
      var pauseTimeout = false;
      var pauseTime = 0;
			var notiftoggle = true;
      var orangetoggle = true;
      var redtoggle = true;
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout)
			message.channel.send(`All notifications are now off!`);
		}
	},
};