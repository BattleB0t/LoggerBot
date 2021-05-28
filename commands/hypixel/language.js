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

    var languages = ["ENGLISH", "GERMAN", "FRENCH", "DUTCH", "SPANISH", "ITALIAN", "CHINESE_SIMPLIFIED", "CHINESE_TRADITIONAL", "PORTUGUESE_BR", "RUSSIAN", "KOREAN", "POLISH", "JAPANESE", "PIRATE", "PORTUGUESE_PT", "GREEK"];

   if (!args[0]) return message.reply(`The whitelisted language on Hypixel is set to ${hypixelLanguage}.`);
   if (!languages.includes(args[0].toUpperCase())) return message.reply(`That doesn't seem to be a valid language! Please choose one of the following: English German, French, Dutch, Spanish, Italian, Chinese_Simplified, Chinese_Traditional, Portuguese_BR, Russian, Korean, Polish, Japanese, Pirate, Portuguese_PT, Greek.`)
		var hypixelLanguage = (args[0].toUpperCase());

    funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout, alertTimeout)
    
    message.channel.send(`Whitelisted language on Hypixel is set to ${hypixelLanguage}.`)
	},
};
