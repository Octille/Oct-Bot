const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",

    async run (client, message, args) {

        const embed = new Discord.MessageEmbed()
        .setTitle(`${member.username}'s avatar`)
        .setImage(message.author.displayAvatarURL)
        .setColor("RANDOM")

        message.channel.send(embed);
    }
}