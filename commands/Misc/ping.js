const discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: "this is a test command!",
    run: async (client, message, args) =>{
        const embed = new Discord.MessageEmbed()
        .setDescription(`🏓 | Latency is: **${Date.now() - message.createdTimestamp}ms.**`)

        
        message.channel.send(embed);
    },
};