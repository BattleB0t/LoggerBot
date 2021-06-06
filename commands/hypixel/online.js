const fs = require('fs');
const { prefix } = require('../../userConfig.json');
const Discord = require('discord.js');
const funcImports = require( __dirname + '../../../functions');
module.exports = {
	name: 'online',
	description: 'Allows you to set when logins SHOULD NOT occur, allowing you to recieve an alert on unusual sessions. Notes: The numbers refer to hours. Set the hours using the 24 hour standard. The first set of numbers refers to Sunday, the next is Monday, etc.',
  usage: `\`${prefix}online <#> to <#>, <#> to <#>, <#> to <#>, <#> to <#>, <#> to <#>, <#> to <#>, <#> to <#>\`\n\nExample: \`${prefix}online 1 to 8, 23 to 7, 23 to 7, 23 to 7, 23 to 7, 23 to 7, 1 to 8\``,
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

    if (!/^(2[0-4]|1[0-9]|[1-9])\sto\s(2[0-4]|1[0-9]|[1-9]),\s(2[0-4]|1[0-9]|[1-9])\sto\s(2[0-4]|1[0-9]|[1-9]),\s(2[0-4]|1[0-9]|[1-9])\sto\s(2[0-4]|1[0-9]|[1-9]),\s(2[0-4]|1[0-9]|[1-9])\sto\s(2[0-4]|1[0-9]|[1-9]),\s(2[0-4]|1[0-9]|[1-9])\sto\s(2[0-4]|1[0-9]|[1-9]),\s(2[0-4]|1[0-9]|[1-9])\sto\s(2[0-4]|1[0-9]|[1-9]),\s(2[0-4]|1[0-9]|[1-9])\sto\s(2[0-4]|1[0-9]|[1-9])$/gm.test(message.content.slice(8))) return message.reply(`that doesn't seem to be valid! Refer to the proper command usage with \`${prefix}help <command>\``).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);}); //regex string

    var arrayReady = input.replace(/,+/gm, "");

    var loginTimes = arrayReady.split(" ");
    
    const offlineData = new Discord.MessageEmbed()
        .setColor('#7289DA')
        .setTitle(`Success!`)
        .setFooter(`Executed at ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621');
        offlineData.addField(`Sunday`, `${loginTimes[0]} to ${loginTimes[1]}`);
        offlineData.addField(`Monday`, `${loginTimes[2]} to ${loginTimes[3]}`);
        offlineData.addField(`Tuesday`, `${loginTimes[4]} to ${loginTimes[5]}`);
        offlineData.addField(`Wednesday`, `${loginTimes[6]} to ${loginTimes[7]}`);
        offlineData.addField(`Thursday`, `${loginTimes[8]} to ${loginTimes[9]}`);
        offlineData.addField(`Friday`, `${loginTimes[10]} to ${loginTimes[11]}`);
        offlineData.addField(`Saturday`, `${loginTimes[12]} to ${loginTimes[13]}`);
  message.reply(offlineData);
  funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout, loginTimes)
	},
};
