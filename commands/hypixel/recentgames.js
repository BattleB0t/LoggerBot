const Discord = require('discord.js');
const fs = require('fs');
const userConfig = require('../../userConfig.json');
const uuid = userConfig["MinecraftUUID"];
const prefix = userConfig["prefix"]
const fetch = require('node-fetch');
const hypixelAPIkey = process.env['Hypixel'];
const funcImports = require( __dirname + '../../../functions');
module.exports = {
	name: 'recentgames',
  aliases: ['recent'],
	description: `Shows the 10 most recent games of any player. Games beyond 3 days ago cannot be shown. Doing \`${prefix}recentgames\` without arguments will show your own data. As this command uses the Slothpixel API over the Hypixel API, the data is slightly delayed and may not be accurate.`,
  usage: `\`${prefix}recentgames\`,\`${prefix}recentgames <IGN or UUID>\``,
  args: false,
  cooldown: 7.5,
	execute(message, args, client) {
    message.channel.send('Loading..').then(async msg => {

    function recentGameAPI(playerUUID, playerUsername) {
      fetch(`https://api.slothpixel.me/api/players/${playerUUID}/recentGames`)
        .then(recentData => recentData.json())
        .then((recentData) => {
          if (recentData.hasOwnProperty('error')) {
            msg.delete();
            return message.reply(`there was an error while trying to retrieve your requested information. Error: ${json.cause.toUpperCase()}`).then(async msg => {setTimeout(() => {msg.delete();}, 10000);});
            }

      const recentGamesEmbed = new Discord.MessageEmbed()
        .setColor('#7289DA')
        .setTitle(`**Most Recent Games - ${playerUsername}**`)
        .setDescription(`Some gametypes like Skyblock will not show up due to limitations with Hypixel's API. Games may take a while to appear here due to use of the Slothpixel API.`)
        .setFooter(`Executed at ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621');

        var i;
        for (i = 0; i < 10; i++) {
          if (recentData[i]) {
        recentGamesEmbed.addField(`${recentData[i].gameType} at ${new Date(recentData[i].date).toLocaleTimeString()}, ${new Date(recentData[i].date).toLocaleDateString()}`, `${recentData[i].hasOwnProperty('ended') && recentData[i].ended ? `Game Time End: ${new Date(recentData[i].ended).toLocaleTimeString()}\n` : `${i == 1 ? `Game Time End: In progress\n` : `Game Time End: Unknown\n` }` }${recentData[i].hasOwnProperty('ended') && recentData[i].ended ? `Play Time: ${new Date(recentData[i].ended - recentData[i].date).toISOString().substr(11, 8)}\n` : `Play Time Elapsed: ${new Date(new Date() - recentData[i].date).toISOString().substr(11, 8)}\n` }${recentData[i].mode ? `Mode: ${recentData[i].mode}\n` : `` }${recentData[i].map ? `Map: ${recentData[i].map}` : `` }`)
        }
    }
    if (!recentData[0]) {
          recentGamesEmbed.addField(`No Recent Games Detected!`, `There are no recent games to show. Games played more than 3 days ago cannot be shown. Some players also have the recent games API option disabled.`)
        }
    msg.delete();
    message.reply(recentGamesEmbed);
    })
    .catch((err) => {
								if (err instanceof FetchError) {
									msg.delete();
									message.channel.send(`An error occured on parsing a json. This is occasioanlly expected. Try again later.`);
									console.log(err);
								} else {
									msg.delete();
									message.channel.send(`An error occured. Please report this: ${err}`);
									console.log(err);
								}
					   		});
    }


if (!args[0]) {
    recentGameAPI(uuid)
    return;
    }

if (!/(^[\w+]{1,16}$)|(^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$)/ig.test(args[0])) {
  msg.delete();
  return message.reply(`that doesn't seem to be a valid Minecraft username!`).then(async msg => {setTimeout(() => {msg.delete();}, 10000);});
  }

    fetch(`https://api.slothpixel.me/api/players/${args[0]}`)
    .then(res => res.json())
        .then((response) => {
          if (response.hasOwnProperty('error')) {
            msg.delete();
            return message.reply('that username doesn\'t seem to be valid.').then(async msg => {setTimeout(() => {msg.delete();}, 10000);});
            }
          recentGameAPI(response.uuid, response.username)
    })
     .catch((err) => {
								if (err instanceof FetchError) {
									message.channel.send(`An error occured on parsing a json. This is occasioanlly expected. Try again later.`);
									console.log(err);
								} else {
									message.channel.send(`An error occured. Please report this: ${err}`);
									console.log(err);
								}
					})
    
    });
	},
};
