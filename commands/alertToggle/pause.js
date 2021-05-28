const fs = require('fs');
const funcImports = require( __dirname + '../../../functions');
module.exports = {
	name: 'pause',
  usage: '<number> <unit of time>',
	description: 'Pauses!',
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
  globalThis.pauseAction;
  const amount = args[0];
  const unit = args[1];

  if (amount === 'clear') {
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
    return;
  }
  if (!amount) return message.reply(`Usage: !pause [Number] [Hour, minute, second]`)
  if (isNaN(amount)) return message.reply("that doesn't seem to be a valid number.").then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});

  var unittypes =  funcImports.unitType(unit)
    var multiple = unittypes.multiple, type = unittypes.type;
    var pauseTime = (amount * multiple)
  
	if (pauseTime < 1 || pauseTime > 2147483647) return message.reply('you need to input an amount of time that is atleast 1 second, and less than 24.8 days or 2,147,483 seconds.').then(async msg => {
			setTimeout(() => {msg.delete();}, 10000);});
            
	if (pauseTimeout) {
			message.channel.send(`Previous alert timeout cleared, and alerts are now paused for ${funcImports.pauseToHMS(pauseTime, amount, type)}`);
      clearTimeout(globalThis.pauseAction);
        var notificationorange = false;
        var notificationred = false;
        var pauseTimeout = true;
        var notiftoggle = true;
        var orangetoggle = true;
        var redtoggle = true;
        funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout)
       globalThis.pauseAction = setTimeout(() => {
        var notificationorange = true;
        var notificationred = true;
        var pauseTimeout = false;
        var notiftoggle = false;
        var orangetoggle = false;
        var redtoggle = false;
        funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout)
        message.reply(`Alerts have been resumed!`);
  }, pauseTime);
      return;
	}
			message.channel.send(`Alerts are paused for ${funcImports.pauseToHMS(pauseTime, amount, type)}`);
      clearTimeout(globalThis.pauseAction);
        var notificationorange = false;
        var notificationred = false;
        var pauseTimeout = true;
        var notiftoggle = true;
        var orangetoggle = true;
        var redtoggle = true;
        funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout)
      globalThis.pauseAction = setTimeout(() => {
        var notificationorange = true;
        var notificationred = true;
        var pauseTimeout = false;
        var notiftoggle = false;
        var orangetoggle = false;
        var redtoggle = false;
        funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout)
        message.reply(`Alerts have been resumed!`);
  }, pauseTime);

	},
};