const fs = require('fs');
const { prefix } = require('../../userConfig.json');
const funcImports = require( __dirname + '../../../functions');
module.exports = {
	name: 'language',
  aliases: ['lang'],
	description: 'Allows you to whitelist a language for use on Hypixel! \`${prefix}language <language> bypass\` will allow you to set the language as anything incase additional languages become supported.',
  usage: `\`${prefix}language <language>\`, \`${prefix}language current\`, \`${prefix}language <language> bypass\``,
  args: true,
  cooldown: 10,
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

    var languages = ["ENGLISH", "GERMAN", "FRENCH", "DUTCH", "SPANISH", "ITALIAN", "CHINESE_SIMPLIFIED", "CHINESE_TRADITIONAL", "PORTUGUESE_BR", "RUSSIAN", "KOREAN", "POLISH", "JAPANESE", "PIRATE", "PORTUGUESE_PT", "GREEK"];

   if (args[0] == 'current') return message.reply(`The whitelisted language on Hypixel is set to ${hypixelLanguage}.`);
   if (args[1] == 'bypass') {
      var hypixelLanguage = args[0]
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout, loginTimes)
      return message.channel.send(`Whitelisted language on Hypixel is set to ${hypixelLanguage}.`)
    }
   
   if (!languages.includes(args[0].toUpperCase())) return message.reply(`That doesn't seem to be a valid language! Please choose one of the following: English, German, French, Dutch, Spanish, Italian, Chinese_Simplified, Chinese_Traditional, Portuguese_BR, Russian, Korean, Polish, Japanese, Pirate, Portuguese_PT, or Greek.`).then(async msg => {
		setTimeout(() => {msg.delete();}, 20000);});

  if (args[0].toUpperCase() == hypixelLanguage) return message.reply(`The whitelisted language on Hypixel was already set to ${hypixelLanguage}!`).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
		var hypixelLanguage = (args[0].toUpperCase());

    funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout, loginTimes)
    
    message.channel.send(`Whitelisted language on Hypixel is set to ${hypixelLanguage}.`)
	},
};
