const fs = require('fs');
const { prefix } = require('../../userConfig.json');
const funcImports = require( __dirname + '../../../functions');
module.exports = {
	name: 'version',
	description: 'Allows you to whitelist a version of Minecraft for use on Hypixel!',
  usage: `<version> or ${prefix}version current`,
  args: true,
  cooldown: 5,
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
    
    if (args[0] == 'current') return message.reply(`The whitelisted version on Hypixel is set to ${preferredMcVersion}.`);

    if (!/1\.(?:20\.[1-6]|1(?:9\.[0-6]|7\.[1-6]|[48]\.[1-4]|[1-35]\.[12]|6\.[1-5])|8(?:\.[1-9])?|20|1[1-9]|9)/.test(args[0]))     return message.reply(`Please enter a valid version of Minecraft; e.g. 1.8, 1.8.9, 1.16.5`).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);}); //regex string

    if (args[0].toUpperCase() == preferredMcVersion) return message.reply(`The whitelisted version on Hypixel was already set to ${preferredMcVersion}!`).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
		  preferredMcVersion = args[0]

      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout, alertTimeout)

      message.channel.send(`Whitelisted version of Minecraft on Hypixel is set to ${preferredMcVersion}.`)
	},
};