const fs = require('fs');
const { prefix } = require('../../userConfig.json');
const funcImports = require( __dirname + '../../../functions');
module.exports = {
	name: 'pauseclear',
  aliases: ['pclear'],
	description: 'Clears running alert timeouts!',
  cooldown: 2,
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

  if (!pauseTimeout) return message.reply(`No alert timeout is running!`).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
      clearTimeout(globalThis.pauseAction);
      var notificationorange = true;
      var notificationred = true;
      var pauseTimeout = false;
      var pauseTime = 0;
      var notiftoggle = false;
      var orangetoggle = false;
      var redtoggle = false;
      funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout)
      message.channel.send(`The alert timeout has been cleared!`);
	},
};