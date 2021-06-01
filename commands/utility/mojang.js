const fs = require('fs');
const { prefix } = require('../../userConfig.json');
const funcImports = require( __dirname + '../../../functions');
const fetch = require('node-fetch');
const Discord = require('discord.js');
module.exports = {
	name: 'mojang',
	description: `Checks the status of Mojang services.`,
  usage: `\`${prefix}mojang\``,
  args: false,
  cooldown: 10,
	execute(message, args, client) {
message.channel.send('Loading..').then(async msg => {
			

fetch(`https://status.mojang.com/check`)
    .then(res => res.json())
        .then((mojang) => {
    
var arr = []

arr[0] = mojang[7]["mojang.com"].toUpperCase()
arr[1] = mojang[2]["account.mojang.com"].toUpperCase()
arr[2] = mojang[3]["authserver.mojang.com"].toUpperCase()
arr[3] = mojang[4]["sessionserver.mojang.com"].toUpperCase()
arr[4] = mojang[5]["api.mojang.com"].toUpperCase()
arr[5] = mojang[0]["minecraft.net"].toUpperCase()
arr[6] = mojang[1]["session.minecraft.net"].toUpperCase()
arr[7] = mojang[6]["textures.minecraft.net"].toUpperCase()


a = arr.map(function(item) { return item == 'GREEN' ? ':white_check_mark:' : item; });
b = a.map(function(item) { return item == 'YELLOW' ? ':yellow_square:' : item; });
array = b.map(function(item) { return item == 'RED' ? ':no_entry_sign:' : item; });


const mojangStatus = new Discord.MessageEmbed()
	.setColor('#7289DA')
	.setTitle('Mojang Services Status')
	.setDescription('Checks the status of Mojang\'s services')
	.addFields(
    { name: 'mojang.com', value: `${array[0]}` },
		{ name: 'account.mojang.com', value: `${array[1]}` },
    { name: 'authserver.mojang.com', value: `${array[2]}` },
		{ name: 'sessionserver.mojang.com', value: `${array[3]}` },
    { name: 'api.mojang.com', value: `${array[4]}` },
		{ name: 'minecraft.net', value: `${array[5]}` },
		{ name: 'session.minecraft.net', value: `${array[6]}` },
    { name: 'textures.minecraft.net', value: `${array[7]}` },
	)
	.setFooter(`Executed at ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`, 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e9/Book_and_Quill_JE2_BE2.png/revision/latest/scale-to-width-down/160?cb=20190530235621')

  msg.delete();
  message.reply(mojangStatus);

      })	
		});
	},
};