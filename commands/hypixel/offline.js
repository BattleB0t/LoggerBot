const fs = require('fs');
const { prefix } = require('../../userConfig.json');
const Discord = require('discord.js');
const funcImports = require( __dirname + '../../../functions');
module.exports = {
	name: 'offline',
	description: 'Allows you to set when logins SHOULD NOT occur, allowing you to recieve an alert on unusual sessions. Notes: The numbers refer to hours. Set the hours using the 24 hour standard, where 0 is from 12 am to 12:59 am, and 23 is 11 pm to 11:59 pm',
  usage: `\`${prefix}offline <#> to <#>\`, \`${prefix}offline current\`\n\nExample argument:\n\`${prefix}offline 1 to 8\` - Blacklists logins from 1:00 am to 8:59 am\n\`${prefix}offline 23 to 8\` - Blacklists logins from 11:00 pm to 8:59 am`,
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

    var input = message.content.slice(8).toString()
    if (args[0] == 'current') {
const offlineData = new Discord.MessageEmbed()
        .setColor('#7289DA')
        .setTitle(`Blacklisted Login Data`)
        .setFooter(`Executed at ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621');
        offlineData.addField(`Blacklisted Offline Times`, `${loginTimes[0]}:00 to ${loginTimes[1]}:59`);
  message.reply(offlineData);
  return;
    }

    if (!/^(2[0-3]|1[0-9]|[0-9])\sto\s(2[0-3]|1[0-9]|[0-9])$/gm.test(message.content.slice(8))) return message.reply(`that doesn't seem to be valid! Refer to the proper command usage with \`${prefix}help <command>\``).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);}); //regex string

    var arrayReplace1 = input.replace(/[^\d ]+/gm, "");
    var arrayReplace2 = arrayReplace1.replace(/\s{2,}/g, ' ');
    var loginTimes = arrayReplace2.split(" ");
    
    const offlineData = new Discord.MessageEmbed()
        .setColor('#7289DA')
        .setTitle(`Success!`)
        .setFooter(`Executed at ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621');
        offlineData.addField(`Blacklisted Login Times`, `${loginTimes[0]} to ${loginTimes[1]}`);
  message.reply(offlineData);
  funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout, loginTimes)
	},
};
