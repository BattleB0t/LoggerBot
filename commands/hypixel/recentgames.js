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
	description: `Shows the 10 most recent games of any player. Games beyond 3 days ago cannot be shown. Doing \`${prefix}recentgames\` without arguments will show your own data.`,
  usage: `\`${prefix}recentgames\`,\`${prefix}recentgames <player>\``,
  args: false,
  cooldown: 10,
	execute(message, args, client) {
    message.channel.send('Loading..').then(async msg => {

    function recentGameAPI(playerUUID) {
      fetch(`https://api.hypixel.net/recentgames?uuid=${playerUUID}&key=${hypixelAPIkey}`)
        .then(res => res.json())
        .then((json) => {

      const recentGamesEmbed = new Discord.MessageEmbed()
        .setColor('#7289DA')
        .setTitle('**Most Recent Games**')
        .setDescription(`Some gametypes like Skyblock will not show up due to limitations with Hypixel's API. Games may take a while to appear here.`)
        .setFooter(`Executed at ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621');

        if (json.games[0]) {
          recentGamesEmbed.addField(`${json.games[0].gameType} at ${new Date(json.games[0].date).toLocaleTimeString()}, ${new Date(json.games[0].date).toLocaleDateString()}`, `Play time: ${new Date(json.games[0].ended - json.games[0].date).toISOString().substr(11, 8)}\n${json.games[0].mode !== null ? `Mode: ${json.games[0].mode}\n` : `` }${json.games[0].map !== null ? `Map: ${json.games[0].map}` : `` }`)
        }
        if (json.games[1]) {
          recentGamesEmbed.addField(`${json.games[1].gameType} at ${new Date(json.games[1].date).toLocaleTimeString()}, ${new Date(json.games[1].date).toLocaleDateString()}`, `Play time: ${new Date(json.games[1].ended - json.games[1].date).toISOString().substr(11, 8)}\n${json.games[1].mode !== null ? `Mode: ${json.games[1].mode}\n` : `` }${json.games[1].map !== null ? `Map: ${json.games[1].map}` : `` }`)
        }
        if (json.games[2]) {
          recentGamesEmbed.addField(`${json.games[2].gameType} at ${new Date(json.games[2].date).toLocaleTimeString()}, ${new Date(json.games[2].date).toLocaleDateString()}`, `Play time: ${new Date(json.games[2].ended - json.games[2].date).toISOString().substr(11, 8)}\n${json.games[2].mode !== null ? `Mode: ${json.games[2].mode}\n` : `` }${json.games[2].map !== null ? `Map: ${json.games[2].map}` : `` }`)
        }
        if (json.games[3]) {
          recentGamesEmbed.addField(`${json.games[3].gameType} at ${new Date(json.games[3].date).toLocaleTimeString()}, ${new Date(json.games[3].date).toLocaleDateString()}`, `Play time: ${new Date(json.games[3].ended - json.games[3].date).toISOString().substr(11, 8)}\n${json.games[3].mode !== null ? `Mode: ${json.games[3].mode}\n` : `` }${json.games[3].map !== null ? `Map: ${json.games[3].map}` : `` }`)
        }
        if (json.games[4]) {
          recentGamesEmbed.addField(`${json.games[4].gameType} at ${new Date(json.games[4].date).toLocaleTimeString()}, ${new Date(json.games[4].date).toLocaleDateString()}`, `Play time: ${new Date(json.games[4].ended - json.games[4].date).toISOString().substr(11, 8)}\n${json.games[4].mode !== null ? `Mode: ${json.games[4].mode}\n` : `` }${json.games[4].map !== null ? `Map: ${json.games[4].map}` : `` }`)
        }
        if (json.games[5]) {
          recentGamesEmbed.addField(`${json.games[5].gameType} at ${new Date(json.games[5].date).toLocaleTimeString()}, ${new Date(json.games[5].date).toLocaleDateString()}`, `Play time: ${new Date(json.games[5].ended - json.games[5].date).toISOString().substr(11, 8)}\n${json.games[5].mode !== null ? `Mode: ${json.games[5].mode}\n` : `` }${json.games[5].map !== null ? `Map: ${json.games[5].map}` : `` }`)
        }
        if (json.games[6]) {
          recentGamesEmbed.addField(`${json.games[6].gameType} at ${new Date(json.games[6].date).toLocaleTimeString()}, ${new Date(json.games[4].date).toLocaleDateString()}`, `Play time: ${new Date(json.games[6].ended - json.games[6].date).toISOString().substr(11, 8)}\n${json.games[6].mode !== null ? `Mode: ${json.games[6].mode}\n` : `` }${json.games[6].map !== null ? `Map: ${json.games[6].map}` : `` }`)
        }
        if (json.games[7]) {
          recentGamesEmbed.addField(`${json.games[7].gameType} at ${new Date(json.games[7].date).toLocaleTimeString()}, ${new Date(json.games[4].date).toLocaleDateString()}`, `Play time: ${new Date(json.games[7].ended - json.games[4].date).toISOString().substr(11, 8)}\n${json.games[7].mode !== null ? `Mode: ${json.games[7].mode}\n` : `` }${json.games[7].map !== null ? `Map: ${json.games[7].map}` : `` }`)
        }
        if (json.games[8]) {
          recentGamesEmbed.addField(`${json.games[8].gameType} at ${new Date(json.games[8].date).toLocaleTimeString()}, ${new Date(json.games[8].date).toLocaleDateString()}`, `Play time: ${new Date(json.games[8].ended - json.games[8].date).toISOString().substr(11, 8)}\n${json.games[8].mode !== null ? `Mode: ${json.games[8].mode}\n` : `` }${json.games[8].map !== null ? `Map: ${json.games[8].map}` : `` }`)
        }
        if (json.games[9]) {
          recentGamesEmbed.addField(`${json.games[9].gameType} at ${new Date(json.games[9].date).toLocaleTimeString()}, ${new Date(json.games[9].date).toLocaleDateString()}`, `Play time: ${new Date(json.games[9].ended - json.games[4].date).toISOString().substr(11, 8)}\n${json.games[9].mode !== null ? `Mode: ${json.games[9].mode}\n` : `` }${json.games[9].map !== null ? `Map: ${json.games[9].map}` : `` }`)
        }
        if (!json.games[0]) {
          recentGamesEmbed.addField(`No Recent Games Detected!`, `There are no recent games to show. Games played more than 3 days ago cannot be shown. Some players also have the recent games API option disabled.`)
        }
    msg.delete();
    message.reply(recentGamesEmbed);
    });
    }

if (!args[0]) {
    recentGameAPI(uuid)
    return;
    }

if (!/^[\w+]{1,16}$/gm.test(args[0])) return message.reply(`that doesn't seem to be a valid Minecraft username!`).then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});

    fetch(`https://api.hypixel.net/player?name=${args[0]}&key=${hypixelAPIkey}`)
    .then(res => res.json())
        .then((response) => {
          if (response.player == null) return message.reply('that username doesn\'t seem to be valid.').then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
          mojangAPI()
    })
     .catch(err => console.log(err));

    function mojangAPI() {

    fetch(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`)
    .then(res => res.json())
        .then((mojang) => {
      if (mojang == null || mojang == undefined) return message.reply('something went wrong. Mojang services may be having issues.').then(async msg => {
		setTimeout(() => {msg.delete();}, 10000);});
      recentGameAPI(mojang.id)
    })
     .catch(err => console.log(err));
    }
    
    });
	},
};
