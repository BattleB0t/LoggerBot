const fs = require('fs');
const funcImports = require( __dirname + '../../../functions');
module.exports = {
	name: 'red',
	description: 'Red alert!',
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

		if (redtoggle == true) {
			message.channel.send(`Red Alert notifications are now on!`);
			var notificationred = true;
			var redtoggle = false;
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout)
		} else if (redtoggle == false) {
			message.channel.send(`Red Alert notifications are now off!`);
			var notificationred = false;
      clearTimeout(globalThis.pauseAction)
      var pauseTimeout = false;
      var pauseTime = 0;
			var redtoggle = true;
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout)
		}
	},
};