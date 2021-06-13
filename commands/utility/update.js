const fs = require('fs');
const { prefix } = require('../../userConfig.json');
const funcImports = require( __dirname + '../../../functions');
const fetch = require('node-fetch');
const Discord = require('discord.js');
module.exports = {
	name: 'update',
	description: `Updates constants for some services`,
  usage: `\`${prefix}update\``,
  args: false,
  ownerReq: true,
  cooldown: 10,
	execute(message, args, client) {

  var readData = funcImports.readConstants();
    var languages = readData.languages,
    gametypes = readData.gametypes;		
	

	Promise.all([
            fetch(`https://api.slothpixel.me/api/constants/languages`).then(data => data.json()),
            fetch(`https://api.slothpixel.me/api/constants/game_types`).then(data => data.json())
            ])
            .then((data) => {
              if (data.hasOwnProperty('error')) {
            msg.delete();
            return message.reply('an error occured while fetching data to update the commands.').then(async msg => {setTimeout(() => {msg.delete();}, 10000);});
        }

        function language(){
        var lengthOfLangFetch = Object.keys(data[0]).length
        var lengthOfLangOld = languages.length

        return (Object.keys(data[0]))
        }

        function gametypes(){
        var lengthOfGameFetch = Object.keys(data[1]).length
        var lengthOfGameOld = gametypes.length

        var i, 
        game_type = [];
        for (i = 0; i < lengthOfGameFetch; i++) {
        game_type.push(data[1][i].type_name)
    }
          
        return (game_type)
        }

        var languagesNew = language()
        languagesNew.push("UNDEFINED")
        var gametypesNew = gametypes()
        gametypesNew.push("UNDEFINED")

funcImports.saveConstants(languagesNew, gametypesNew)
message.channel.send('Complete. Checked/Updated Language and Gametype.')

            })

	},
};