const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('../../userConfig.json');
const funcImports = require( __dirname + '../../../functions'); //change it to only display one type that shows everything
const fetch = require('node-fetch');
module.exports = {
	name: 'status',
	description: 'Diaplays detailed information about a player\'s status. This includes useful data like thier current gamemode, language, version, playtime, etc. As this command uses the Slothpixel API over the Hypixel API, the data is slightly delayed and may not be accurate. Players like "simon" display inaccurate information currently.',
  usage: `\`${prefix}status <IGN or UUID>\``,
  args: true,
  cooldown: 7.5,
	execute(message, args, client) {
    message.channel.send('Loading..').then(async msg => {

      if (!/(^[\w+]{1,16}$)|(^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$)/ig.test(args[0])) {
        msg.delete();
        return message.reply(`that doesn't seem to be a valid Minecraft username!`).then(async msg => {setTimeout(() => {msg.delete();}, 10000);});
        }

	Promise.all([
            fetch(`https://api.slothpixel.me/api/players/${args[0]}/`).then(player => player.json()),
            fetch(`https://api.slothpixel.me/api/players/${args[0]}/status`).then(status => status.json())
            ])
            .then((player, status) => { //not sure why but using "status" works and i dont want to mess aorund with it
      
      if (player[0].hasOwnProperty('error')) {
            msg.delete();
            return message.reply('that username doesn\'t seem to be valid.').then(async msg => {setTimeout(() => {msg.delete();}, 10000);});
            }

			function secondsToDays(seconds) { //calculting days from seconds
				seconds1 = Number(seconds);
				var d = Math.floor(seconds / (3600 * 24));
				var dDisplay = d > 0 ? d + (d == 1 ? ' day ' : ' days ') : '';
				return dDisplay;
			}

      var newdate = new Date();
      var datestring = newdate.toLocaleDateString();
      var timestring = newdate.toLocaleTimeString();

      var playerName = player[0].username

      var daysofLastLogin = secondsToDays((new Date() - player[0].last_login) / 1000);
      var daysofLastLogout = secondsToDays((new Date() - player[0].last_logout) / 1000);
      var daysofLastPlaytime = secondsToDays((player[0].last_logout - player[0].last_login) / 1000);

      var mostRecentGametype = player[0].last_game
      var currentGametype = player[1].game.type //can only be used when player is online
      var gameMode = player[1].game.mode
      var map = player[1].game.map //map of the game, eg: tribute on skywars

      let numberLogin = player[0].last_login * 1
      let numberLogout = player[0].last_logout * 1

      var secLastLogin = Math.round((new Date() - player[0].last_login) / 1000);
	    var hmsLastLogin = new Date(Math.round(secLastLogin * 1000)).toISOString().substr(11, 8);

			var secLastLogout = Math.round((new Date() - player[0].last_logout) / 1000);
			var hmsLastLogout = new Date(Math.round(secLastLogout * 1000)).toISOString().substr(11, 8);

			var secLastPlaytime = Math.round((player[0].last_logout - player[0].last_login) / 1000);
			var hmsLastPlaytime = new Date(Math.round(secLastPlaytime * 1000)).toISOString().substr(11, 8);

			var offlineLastLogin = new Date(new Date() - (new Date() - player[0].last_login));
			var offlineLastLogout = new Date(new Date() - (new Date() - player[0].last_logout));

const embed = new Discord.MessageEmbed()
		.setColor('#7289DA')
		.setTitle(`Status of ${player[0].username}`)
    .setFooter(`Executed at ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621')
    .setDescription(`Data is not quite real-time.`)
    if (!player[1].online) {
    embed.addFields(
    { name: 'Status', value: `${playerName} is offline` },
    { name: 'Last Session', value: `${player[0].last_login ? `Last Playtime: ${daysofLastPlaytime}${hmsLastPlaytime} long` : `Playtime: Unknown`}\n${player[0].last_game ? `Last Gametype: ${player[0].last_game}` : `Last Gametype: Unknown` }` },
    { name: 'Last Login', value: `${player[0].last_login ? `Last Login: ${offlineLastLogin.toLocaleString()}\n${daysofLastLogin}${hmsLastLogin} ago` : `Unknown` }` },
    { name: 'Last Logout', value: `${player[0].last_logout ? `Last Logout: ${offlineLastLogout.toLocaleString()}\n${daysofLastLogout}${hmsLastLogout} ago` : `Unknown` }` },
    { name: 'Settings', value: `${player[0].language ? `Language: ${player[0].language}` : `Language: Unknown` }\n${player[0].mc_version ? `Version: ${player[0].mc_version}` : `Version: Unknown` }` })
  } else if (player[1].online) {
    embed.addFields(
		{ name: 'Status', value: `${playerName} is online` },
    { name: 'Session', value: `${player[0].last_login ? `Playtime: ${daysofLastLogin}${hmsLastLogin}` : `Playtime: Unknown`}\n${player[1].game.type ? `Game: ${player[1].game.type}\n` : `` }${player[1].game.mode ? `Mode: ${player[1].game.mode}\n` : `` }${player[1].game.map ? `Map: ${player[1].game.map}` : `` }${!player[1].game.type && !player[1].game.mode && !player[1].game.map ? `Data not available: Limited API!` : `` }` },
    { name: 'Last Login', value: `${player[0].last_login ? `Last Login: ${new Date(player[0].last_login).toLocaleString()}\n${daysofLastLogin}${hmsLastLogin}` : `Last Login: Unknown`}` },
    { name: 'Last Logout', value: `${player[0].last_logout ? `Last Logout: ${new Date(player[0].last_logout).toLocaleString()}\n${daysofLastLogout}${hmsLastLogout}` : `Last Logout: Unknown`}` },
    { name: 'Settings', value: `${player[0].language ? `Language: ${player[0].language}` : `Language: Unknown` }\n${player[0].mc_version !== null ? `Version: ${player[0].mc_version}` : `Version: Unknown` }` });
    if (!player[1].online && numberLogout < numberLogin) embed.addField(`**API Limitation**`, `This player has turned their Online\nStatus API off. Gametypes, modes,\nand maps cannot be shown when their\nAPI option is off.`);
}
    msg.delete();
		message.channel.send(embed);

		      })
            .catch((err) => {
              msg.delete()
              message.reply(`something went wrong. Try again later.`)
              console.log(err);
      });
    })
	},
};
