const fs = require('fs');
const { prefix } = require('../../userConfig.json');
const funcImports = require( __dirname + '../../../functions');
module.exports = {
	name: 'version',
	description: `Allows you to whitelist a version of Minecraft for use on Hypixel! \`${prefix}version <version> bypass\` will allow you to set the version as anything incase the current filter becomes outdated.`,
  usage: `\`${prefix}version <version>\`, \`${prefix}version current\`, \`${prefix}version <version> bypass\``,
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
    if (args[1] == 'bypass') {
      var preferredMcVersion = args[0]
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout, alertTimeout)
      return message.channel.send(`Whitelisted version of Minecraft on Hypixel is set to ${preferredMcVersion}.`)
    }

    if (!/^1\.(?:(?:2[0-5]|7)\.(?:10|[02-9])|1(?:[7-9]\.(?:10|[02-9])|6\.[0-5]|4\.[0-4]|[1-35]\.[0-2])|(?:2[0-5]|7)(?:\.1)?|1(?:[7-9](?:\.1)?|6|4|[1-35])|8(?:\.[0-9])?)$/.test(args[0])) return message.reply(`Please enter a valid version of Minecraft; e.g. 1.8, 1.8.9, 1.16.5`).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);}); //regex string

    if (args[0].toUpperCase() == preferredMcVersion) return message.reply(`The whitelisted version on Hypixel was already set to ${preferredMcVersion}!`).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
		  var preferredMcVersion = args[0]

      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout, alertTimeout)

      message.channel.send(`Whitelisted version of Minecraft on Hypixel is set to ${preferredMcVersion}.`)
	},
};