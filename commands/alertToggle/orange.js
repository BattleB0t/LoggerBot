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
    notiftoggle = readData.notiftoggle,
    orangetoggle = readData.orangetoggle,
    redtoggle = readData.redtoggle,
    epochOfPause = readData.epochOfPause,
    pauseTime = readData.pauseTime,
    pauseTimeout = readData.pauseTimeout;

		if (orangetoggle == true) {
      var notificationorange = true;
			var orangetoggle = false;
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout)
			message.channel.send(`Orange Alert notifications are now on!`);
		} else if (orangetoggle == false) {
      var notificationorange = false;
      clearTimeout(globalThis.pauseAction)
      var pauseTimeout = false;
      var pauseTime = 0;
			var orangetoggle = true;
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout)
			message.channel.send(`Orange Alert notifications are now off!`);
		}
	},
};