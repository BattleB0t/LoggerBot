const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('../../userConfig.json');
const funcImports = require( __dirname + '../../../functions'); //change it to only display one type that shows everything
const fetch = require('node-fetch');
module.exports = {
	name: 'status',
	description: 'Diaplays detailed information about a player\'s status. This includes useful data like thier current gamemode, language, version, playtime, etc. As this command uses the Slothpixel API over the Hypixel API, the data is slightly delayed and may not be accurate.',
  usage: `\`${prefix}status <username>\``,
  args: true,
  cooldown: 7.5,
	execute(message, args, client) {
    message.channel.send('Loading..').then(async msg => {

      if (!/^[\w+]{1,16}$/gm.test(args[0])) {
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

			function secondsToDLastLogin(seconds) { //calculting days for last login
				seconds1 = Number(seconds);
				var d = Math.floor(seconds / (3600 * 24));
				var dDisplay = d > 0 ? d + (d == 1 ? ' day ' : ' days ') : '';
				return dDisplay;
			}

			function secondsToDLastLogout(seconds) { //calculating days for last logout
				seconds1 = Number(seconds);
				var d = Math.floor(seconds / (3600 * 24));
				var dDisplay = d > 0 ? d + (d == 1 ? ' day ' : ' days ') : '';
				return dDisplay;
			}

      function secondsToDLastPlaytime(seconds) { //days for last playtime
				seconds1 = Number(seconds);
				var d = Math.floor(seconds / (3600 * 24));
				var dDisplay = d > 0 ? d + (d == 1 ? ' day ' : ' days ') : '';
				return dDisplay;
			}
      var newdate = new Date();
      var datestring = newdate.toLocaleDateString();
      var timestring = newdate.toLocaleTimeString();

      var playerName = player[0].username

      var daysofLastLogin = secondsToDLastLogin((new Date() - player[0].last_login) / 1000);
      var daysofLastLogout = secondsToDLastLogout((new Date() - player[0].last_logout) / 1000);
      var daysLastPlaytime = secondsToDLastPlaytime((player[0].last_logout - player[0].last_login) / 1000);

      var mostRecentGametype = player[0].last_game
      var currentGametype = player[1].game.type //can only be used when player is online
      var gameMode = player[1].game.mode
      var map = player[1].game.map //map of the game, eg: tribute on skywars

      var secLastLogin = Math.round((new Date() - player[0].last_login) / 1000);
	    var hmsLastLogin = new Date(Math.round(secLastLogin * 1000)).toISOString().substr(11, 8);

			var secLastLogout = Math.round((new Date() - player[0].last_logout) / 1000);
			var hmsLastLogout = new Date(Math.round(secLastLogout * 1000)).toISOString().substr(11, 8);

			var secLastPlaytime = Math.round((player[0].last_logout - player[0].last_login) / 1000);
			var hmsLastPlaytime = new Date(Math.round(secLastPlaytime * 1000)).toISOString().substr(11, 8);

			var offlineLastLogin = new Date(new Date() - (new Date() - player[0].last_login));
			var offlineLastLogout = new Date(new Date() - (new Date() - player[0].last_logout));

			var MCversion = player[0].mc_version; //Version of Minecraft
			var userLanguage = player[0].language; //Language

const embed = new Discord.MessageEmbed()
		.setColor('#7289DA')
		.setTitle(`Status of ${player[0].username}`)
    .setFooter(`Executed at ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621')
    .setDescription(`Data is not quite real-time.`)
    if (!player[0].online) {
    embed.addFields(
    { name: 'Status', value: `${playerName} is offline` },
    { name: 'Last Session', value: `${player[0].last_game !== null && player[0].last_game !== "" ? `Last Gametype: ${mostRecentGametype}\n` : `` }Last Playtime: ${daysLastPlaytime}${hmsLastPlaytime} long` },
    { name: 'Last Login', value: `Last Login: ${offlineLastLogin.toLocaleString()}\n${daysofLastLogin}${hmsLastLogin} ago` },
    { name: 'Last Logout', value: `Last Logout: ${offlineLastLogout.toLocaleString()}\n${daysofLastLogout}${hmsLastLogout} ago` })
  } else if (player[0].online) {
    embed.addFields(
		{ name: 'Status', value: `${playerName} is online` },
    { name: 'Gamemode', value: `${player[1].game.type !== null ? `Game: ${currentGametype}\n` : `` }${player[1].game.mode !== null ? `Mode: ${gameMode}\n` : `` }${player[1].game.map !== null ? `Map: ${map}` : `` }${player[1].game.type == null && player[1].game.mode == null && player[1].game.map == null ? `Data not available: Limited API!\n` : `` }` },
    { name: 'Session', value: `Playtime: ${daysofLastLogin}${hmsLastLogin}\nLast Login: ${daysofLastLogin}${hmsLastLogin}\nLast Logout: ${daysofLastLogout}${hmsLastLogout}` },
    { name: 'Settings', value: `Language: ${userLanguage}\n${player[0].mc_version !== null ? `Version: ${MCversion}` : `Version: Unknown` }` })
}
    msg.delete();
		message.channel.send(embed);

		      })
            .catch((err) => {
                console.log(err);
      });
    })
	},
};
