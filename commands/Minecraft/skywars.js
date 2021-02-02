const Discord = require('discord.js');
const colors = require('../colors.json');
const fetch = require('cross-fetch');

module.exports = {
    name: 'skywars',
    aliases: ['sw'],
    async execute(message, args, client) {

        if (!args.length) return message.reply('Please provide a valid playername as a parameter.');

        const dFetch = await fetch(`https://api.slothpixel.me/api/players/${args[0]}`);
        const data = await dFetch.json();

        if (data.error && data.error == 'Player does not exist') return message.reply('That player does not exist.');

        const skywars = data['stats']['SkyWars'];
        
        const embed = new Discord.MessageEmbed();
        embed.setDescription(`**Apologies for the inconveniece!\nSlothpixel does not currently provide sufficient data for this command.**`);
        embed.setColor(colors['MainColor']);
        message.channel.send(embed);

    },
    help: 'Sends the statistics of a SkyWars player.'
}