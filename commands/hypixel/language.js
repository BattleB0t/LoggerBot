const fs = require('fs');
const funcImports = require( __dirname + '../../../functions');
module.exports = {
	name: 'language',
	description: 'Language!',
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
    alertTimeout = readData.alertTimeout;

   if (!args[0]) return message.reply(`The whitelisted language on Hypixel is set to ${hypixelLanguage}.`);
		var hypixelLanguage = (args[0].toUpperCase())

    funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout, alertTimeout)
    
    message.channel.send(`Whitelisted language on Hypixel is set to ${hypixelLanguage}.`)
	},
};
