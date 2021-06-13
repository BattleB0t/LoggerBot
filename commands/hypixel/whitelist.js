const fs = require('fs');
const { prefix } = require('../../userConfig.json');
const Discord = require('discord.js');
const funcImports = require( __dirname + '../../../functions');
module.exports = {
	name: 'whitelist',
	description: 'Allows you to set whitelisted game to play on Hypixel. Games detected that are not whitelisted will set off an orange alert. Use <https://api.hypixel.net/#section/Introduction/GameTypes> to find the database name of the game.',
  usage: `\`${prefix}whitelist add/remove <game>\`, \`${prefix}whitelist current\``,
  args: true,
  cooldown: 2.5,
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
    loginTimes = readData.loginTimes,
    whitelistedGames = readData.whitelistedGames,
    blacklistedGames = readData.blacklistedGames;

    var readData = funcImports.readConstants();
    var languages = readData.languages,
    gametypes = readData.gametypes;

    var games = gametypes

    if (!/^[a-zA-Z_]+$/.test(args[0])) return message.reply(`you cannot use any characters that are not letters or underscores! `).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});

    if (args[0].toLowerCase() !== "add" && args[0].toLowerCase() !== "remove" && args[0].toLowerCase() !== "current") return message.reply(`that isn't a valid instruction! Use \'${prefix}whitelist add <game>\' or \'${prefix}whitelist remove <game>\'`).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});

    if (args[0].toLowerCase() == 'current') {
      var uppercaseGames = whitelistedGames.map(whitelistedGames => whitelistedGames.toUpperCase());
      const whitelistedData = new Discord.MessageEmbed()
        .setColor('#7289DA')
        .setTitle(`Whitelisted Games`)
        .setFooter(`Executed at ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621');
        whitelistedData.addField(`Your whitelisted game(s)`, `${whitelistedGames === undefined || whitelistedGames == 0 ? `No whitelisted games found!` : `${uppercaseGames.join(`, `)}`}`);
    return message.reply(whitelistedData)
    }

    if (!args[1]) return message.reply(`you didn't specify any game type! Use this link <https://api.hypixel.net/#section/Introduction/GameTypes> to find the clean name of your game: ${games.join(`, `)}`).then(async msg => {
		setTimeout(() => {msg.delete();}, 30000);});

    if (!games.includes(args[1].toUpperCase())) return message.reply(`that doesn't seem to be a valid game type! Use this link <https://api.hypixel.net/#section/Introduction/GameTypes> to find the clean name of your game. Valid gametypes: ${games.join(`, `)}`).then(async msg => {
		setTimeout(() => {msg.delete();}, 30000);});

    if (args[0].toLowerCase() == 'add') {
      const duplicationCheck = whitelistedGames.indexOf(args[1].toLowerCase())
      if (duplicationCheck !== -1) return message.reply(`that game type was already added!`).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
      whitelistedGames.push(`${args[1].toLowerCase()}`)
      if (!funcImports.gameAlreadyAdded(whitelistedGames, blacklistedGames)) return message.reply(`that game was added to the blacklist. You cannot add a game to both.`)
        funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout, loginTimes, whitelistedGames, blacklistedGames)
      var uppercaseGames = whitelistedGames.map(whitelistedGames => whitelistedGames.toUpperCase());
      const whitelistedData = new Discord.MessageEmbed()
        .setColor('#7289DA')
        .setTitle(`${args[1].toUpperCase()} has been added!`)
        .setFooter(`Executed at ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621');
        whitelistedData.addField(`Your whitelisted game(s)`, `${whitelistedGames === undefined || whitelistedGames == 0 ? `No whitelisted games found!` : `${uppercaseGames.join(`, `)}`}`);
    return message.reply(whitelistedData)
    }

    if (args[0].toLowerCase() == 'remove') {
      const findAndRemove = whitelistedGames.indexOf(args[1].toLowerCase());
        if (findAndRemove > -1) {
          whitelistedGames.splice(findAndRemove, 1);
          if (!funcImports.gameAlreadyAdded(whitelistedGames, blacklistedGames)) return message.reply(`that game was added to the blacklist. You cannot add a game to both.`)
        funcImports.saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout, loginTimes, whitelistedGames, blacklistedGames)
      var uppercaseGames = whitelistedGames.map(whitelistedGames => whitelistedGames.toUpperCase());
      const whitelistedData = new Discord.MessageEmbed()
        .setColor('#7289DA')
        .setTitle(`${args[1].toUpperCase()} has been removed!`)
        .setFooter(`Executed at ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621');
        whitelistedData.addField(`Your whitelisted game(s)`, `${whitelistedGames === undefined || whitelistedGames == 0 ? `No whitelisted games found!` : `${uppercaseGames.join(`, `)}`}`);
    return message.reply(whitelistedData)
        } else return message.reply(`you cannot unwhitelist a game that wasnn\'t already added!`).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
    
    }  
	},
};